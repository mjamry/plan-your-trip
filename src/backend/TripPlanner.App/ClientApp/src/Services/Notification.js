const DefaultNotificationTimeout = 2000;

class Notification {
    constructor(type, content, timeout){
        this.type = type;
        this.content = content;
        this.id = (+new Date()).toString(32);
        this.timeout = timeout;
    }
    type;
    content;
    timeout;
    id;
}

export {DefaultNotificationTimeout, Notification}