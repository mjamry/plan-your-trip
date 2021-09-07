import { NotificationsActions, useNotificationState } from '../State/NotificationState';
import { NotificationType } from '../Common/Dto/Notification';

interface INotificationService {
    success: (content: string) => void;
    error: (content: string) => void;
    info: (content: string) => void;
}

const useNotificationService = (): INotificationService => {
  const { dispatch } = useNotificationState();

  const showError = (content: string) => {
    dispatch({
      type: NotificationsActions.show,
      data: content,
      notificationType: NotificationType.error,
    });
  };

  const showInfo = (content: string) => {
    dispatch({
      type: NotificationsActions.show,
      data: content,
      notificationType: NotificationType.info,
    });
  };

  const showSuccess = (content: string) => {
    dispatch({
      type: NotificationsActions.show,
      data: content,
      notificationType: NotificationType.success,
    });
  };

  return {
    error: showError,
    success: showSuccess,
    info: showInfo,
  };
};

export default useNotificationService;
