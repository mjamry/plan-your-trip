export type ModalDto = {
    header: JSX.Element;
    body: JSX.Element;
    footer?: JSX.Element;
    onClose?: () => void;
};
