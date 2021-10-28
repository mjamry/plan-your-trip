import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import { useListsState, ListsStateActions } from '../State/ListsState';
import useRestClient from '../Common/RestClient';
import { useAppState } from '../State/AppState';
import ListDto from '../Common/Dto/ListDto';

interface IListService {
  add: (list: ListDto) => Promise<void>;
  edit: (list: ListDto) => Promise<void>;
  remove: (list: ListDto) => Promise<void>;
  getAll: () => Promise<ListDto[]>;
}

const usePersistentListService = () => {
  const api = useRestClient();
  const { state: appState } = useAppState();

  const apiUrl = `${appState.appSettings.apiUrl}/lists`;

  const add = (list: ListDto): Promise<ListDto> => api.post(apiUrl, list);

  const remove = (list: ListDto): Promise<ListDto> => api.delete(apiUrl, list);

  const edit = (list: ListDto): Promise<ListDto> => api.put(apiUrl, list);

  const getAll = (): Promise<ListDto[]> => api.get(apiUrl);

  return {
    add,
    remove,
    edit,
    getAll,
  };
};

const useListService = (): IListService => {
  const notificationService = useNotificationService();
  const persistentListService = usePersistentListService();
  const logger = useLoggerService('ListService');
  const { dispatch } = useListsState();

  const setLoading = () => {
    dispatch({
      type: ListsStateActions.isLoading,
      data: true,
    });
  };

  const clearLoading = () => {
    dispatch({
      type: ListsStateActions.isLoading,
      data: false,
    });
  };

  const add = async (list: ListDto): Promise<void> => {
    setLoading();

    persistentListService.add(list)
      .then((listData) => {
        dispatch({
          type: ListsStateActions.addList,
          data: listData,
        });

        dispatch({
          type: ListsStateActions.selectList,
          data: listData.id,
        });

        notificationService.success(`New list added: ${listData.name}`);
        logger.info(`Successfully added list -> Id: ${listData.id} Name: ${listData.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while adding list: ${list.name}`);
        logger.error(`Error while adding new list: Name: ${list.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const edit = async (list: ListDto): Promise<void> => {
    setLoading();

    persistentListService.edit(list)
      .then((listData) => {
        dispatch({
          type: ListsStateActions.editList,
          data: listData,
        });

        notificationService.success(`list modified: ${list.name}`);
        logger.info(`Successfully edited list -> Id: ${list.id} Name: ${list.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while editing list: ${list.name}`);
        logger.error(`Error while editing list: Id: ${list.id} Name: ${list.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const remove = async (list: ListDto): Promise<void> => {
    setLoading();

    persistentListService.remove(list)
      .then(() => {
        dispatch({
          type: ListsStateActions.removeList,
          data: list,
        });

        notificationService.success(`list removed: ${list.name}`);
        logger.info(`Successfully removed list -> Id: ${list.id} Name: ${list.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while removing list: ${list.name}`);
        logger.error(`Error while removing list: Id: ${list.id} Name: ${list.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const getAll = (): Promise<ListDto[]> => new Promise((resolve, reject) => {
    persistentListService.getAll()
      .then((data) => {
        dispatch({
          type: ListsStateActions.loadLists,
          data,
        });

        logger.info(`Successfully loaded ${data.length} lists`);

        resolve(data);
      })
      .catch(() => {
        logger.error('Error while getting all lists data.');
        reject();
      });
  });

  return {
    add,
    edit,
    remove,
    getAll,
  };
};

export default useListService;
