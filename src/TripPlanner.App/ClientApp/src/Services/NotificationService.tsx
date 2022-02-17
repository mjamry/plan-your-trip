import { useSetRecoilState } from 'recoil';
import { NotificationType, Notification } from '../Common/Dto/Notification';
import { showNotificationState } from '../State/NotificationsState';

interface INotificationService {
    success: (content: string) => void;
    error: (content: string) => void;
    info: (content: string) => void;
}

const useNotificationService = (): INotificationService => {
  const showNotification = useSetRecoilState(showNotificationState);

  const showError = (content: string) => {
    showNotification([new Notification(NotificationType.error, content)]);
  };

  const showInfo = (content: string) => {
    showNotification([new Notification(NotificationType.info, content)]);
  };

  const showSuccess = (content: string) => {
    showNotification([new Notification(NotificationType.success, content)]);
  };

  return {
    error: showError,
    success: showSuccess,
    info: showInfo,
  };
};

export default useNotificationService;
