
import {NotificationTypes, NotificationsActions, useNotificationState} from './NotificationState'

const useNotificationService = () => {
    const [{}, dispatchNotification] = useNotificationState();

    var showError = (content) => {
        dispatchNotification({type: NotificationsActions.show, data: content, notificationType: NotificationTypes.error})
    }

    var showInfo = (content) => {
        dispatchNotification({type: NotificationsActions.show, data: content, notificationType: NotificationTypes.info})
    }

    var showSuccess = (content) => {
        dispatchNotification({type: NotificationsActions.show, data: content, notificationType: NotificationTypes.success})
    }

    var hide = (notificationId) => {

    }

    return {
        error: showError,
        success: showSuccess,
        info: showInfo
    }
    

}

export default useNotificationService;