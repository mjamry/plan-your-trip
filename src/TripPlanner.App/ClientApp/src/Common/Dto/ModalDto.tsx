export type ModalDto<T = void> = {
    header: JSX.Element;
    body: JSX.Element;
    footer?: JSX.Element;
    state?: T;
};
