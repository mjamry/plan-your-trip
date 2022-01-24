import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import { usePlansState, PlansStateActions } from '../State/PlansState';
import useRestClient from '../Common/RestClient';
import { useAppState } from '../State/AppState';
import PlanDto from '../Common/Dto/PlanDto';

interface IPlanService {
  add: (plan: PlanDto) => Promise<void>;
  edit: (plan: PlanDto) => Promise<void>;
  remove: (plan: PlanDto) => Promise<void>;
  getAll: () => Promise<PlanDto[]>;
}

const usePersistentPlanService = () => {
  const api = useRestClient();
  const { state: appState } = useAppState();

  const apiUrl = `${appState.appSettings.apiUrl}/plans`;

  const add = (plan: PlanDto) => api.post<PlanDto>(apiUrl, plan);

  const remove = (plan: PlanDto) => api.del<PlanDto>(apiUrl, plan);

  const edit = (plan: PlanDto) => api.put<PlanDto>(apiUrl, plan);

  const getAll = () => api.get<PlanDto[]>(apiUrl);

  return {
    add,
    remove,
    edit,
    getAll,
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

  return {
    add,
    edit,
    remove,
    getAll,
  };
};

export default usePlanService;
