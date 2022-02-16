import { useRecoilValue } from 'recoil';
import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import { usePlansState, PlansStateActions } from '../State/PlansState';
import useRestClient from '../Common/RestClient';
import PlanDto from '../Common/Dto/PlanDto';
import UserDto from '../Common/Dto/UserDto';
import { appSettingsState } from '../State/AppState';

interface IPlanService {
  add: (plan: PlanDto) => Promise<void>;
  edit: (plan: PlanDto) => Promise<void>;
  remove: (plan: PlanDto) => Promise<void>;
  getAll: () => Promise<PlanDto[]>;
  share: (planId: number, users: UserDto[]) => Promise<void>;
  getShare: (planId: number) => Promise<string[]>;
}

const usePersistentPlanService = () => {
  const api = useRestClient();
  const appSettings = useRecoilValue(appSettingsState);
  const apiUrl = `${appSettings.apiUrl}/plans`;

  const add = (plan: PlanDto) => api.post<PlanDto>(apiUrl, plan);

  const remove = (plan: PlanDto) => api.del<PlanDto>(apiUrl, plan);

  const edit = (plan: PlanDto) => api.put<PlanDto>(apiUrl, plan);

  const getAll = () => api.get<PlanDto[]>(apiUrl);

  const share = (planId: number, users: UserDto[]) => api.put<void>(`${apiUrl}/${planId}/share`, users);

  const getShare = (planId: number) => api.get<string[]>(`${apiUrl}/${planId}/share`);

  return {
    add,
    remove,
    edit,
    getAll,
    share,
    getShare,
  };
};

const usePlanService = (): IPlanService => {
  const notificationService = useNotificationService();
  const persistentPlanService = usePersistentPlanService();
  const logger = useLoggerService('PlanService');
  const { dispatch } = usePlansState();

  const setLoading = () => {
    dispatch({
      type: PlansStateActions.isLoading,
      data: true,
    });
  };

  const clearLoading = () => {
    dispatch({
      type: PlansStateActions.isLoading,
      data: false,
    });
  };

  const add = async (plan: PlanDto): Promise<void> => {
    setLoading();

    persistentPlanService.add(plan)
      .then((planData) => {
        dispatch({
          type: PlansStateActions.addPlan,
          data: planData,
        });

        dispatch({
          type: PlansStateActions.selectPlan,
          data: planData.id,
        });

        notificationService.success(`New plan added: ${planData.name}`);
        logger.info(`Successfully added plan -> Id: ${planData.id} Name: ${planData.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while adding plan: ${plan.name}`);
        logger.error(`Error while adding new plan: Name: ${plan.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const edit = async (plan: PlanDto): Promise<void> => {
    setLoading();

    persistentPlanService.edit(plan)
      .then((planData) => {
        dispatch({
          type: PlansStateActions.editPlan,
          data: planData,
        });

        notificationService.success(`Plan modified: ${plan.name}`);
        logger.info(`Successfully edited plan -> Id: ${plan.id} Name: ${plan.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while editing plan: ${plan.name}`);
        logger.error(`Error while editing plan: Id: ${plan.id} Name: ${plan.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const remove = async (plan: PlanDto): Promise<void> => {
    setLoading();

    persistentPlanService.remove(plan)
      .then(() => {
        dispatch({
          type: PlansStateActions.removePlan,
          data: plan,
        });

        notificationService.success(`Plan removed: ${plan.name}`);
        logger.info(`Successfully removed plan -> Id: ${plan.id} Name: ${plan.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while removing plan: ${plan.name}`);
        logger.error(`Error while removing plan: Id: ${plan.id} Name: ${plan.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const getAll = (): Promise<PlanDto[]> => new Promise((resolve, reject) => {
    persistentPlanService.getAll()
      .then((data) => {
        dispatch({
          type: PlansStateActions.loadPlans,
          data,
        });

        logger.info(`Successfully loaded ${data.length} plans`);

        resolve(data);
      })
      .catch(() => {
        logger.error('Error while getting all plans data.');
        reject();
      });
  });

  const share = async (planId: number, users: UserDto[]): Promise<void> => {
    setLoading();

    persistentPlanService.share(planId, users)
      .then(() => {
        notificationService.success('Shares updated');
        logger.info(`Successfully shared plan -> Id: ${planId}`);
      })
      .catch(() => {
        notificationService.error('Error while sharing plan');
        logger.error(`Error while sharing plan -> Id: ${planId}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const getShare = async (planId: number): Promise<string[]> => new Promise((resolve, reject) => {
    persistentPlanService.getShare(planId)
      .then((data) => {
        logger.info(`Successfully loaded ${data.length} shares`);

        resolve(data);
      })
      .catch(() => {
        logger.error('Error while getting share data.');
        reject();
      });
  });

  return {
    add,
    edit,
    remove,
    getAll,
    share,
    getShare,
  };
};

export default usePlanService;
