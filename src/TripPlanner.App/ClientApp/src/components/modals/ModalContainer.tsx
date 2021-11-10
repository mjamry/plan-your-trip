import React, { useState, useEffect } from 'react';
import Modal from './ModalComponent';
import { useModalState, ModalTypes, ModalStateAction } from '../../State/ModalState';
import useLocationFormBuilder from './LocationDetailsForm/LocationDetailsForm';
import ModalHeader from './ModalHeader';
import Confirmation from './Confirmation';
import LoadingIndicator from './LoadingIndicator';
import useLocationService from '../../Services/LocationService';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import useListService from '../../Services/ListService';
import useListFormBuilder from './ListDetailsForm';
import { ModalDto } from '../../Common/Dto/ModalDto';
import { LocationFormStateProvider } from './LocationDetailsForm/LocationDetailsFormState';
import ListDto from '../../Common/Dto/ListDto';

const emptyModal = {} as ModalDto;

type ModalModel = ModalDto | ModalDto<typeof LocationFormStateProvider>;

const useModalContentFactory = () => {
  const { state, dispatch } = useModalState();
  const locationService = useLocationService();
  const listService = useListService();
  const logger = useLoggerService('ModalContentFactory');

  const locationFormBuilder = useLocationFormBuilder();
  const listFormBuilder = useListFormBuilder();

  const create = (modalType: ModalTypes): ModalModel => {
    switch (modalType) {
      case ModalTypes.addLocation:
        return locationFormBuilder(
          {
            title: 'Add location',
            location: state.data,
            onSubmit: (data) => {
              // TODO: add correct listID
              locationService.add(data, 0);
              dispatch({ type: ModalStateAction.hide });
            },
          },
        );

      case ModalTypes.editLocation:
        return locationFormBuilder(
          {
            title: 'Edit location',
            location: state.data,
            onSubmit: (data) => {
              locationService.edit(data);
              dispatch({ type: ModalStateAction.hide });
            },
          },
        );

      case ModalTypes.removeLocation:
      {
        const submitAction = () => {
          locationService.remove(state.data);
          dispatch({ type: ModalStateAction.hide });
        };

        return {
          header: <ModalHeader title={`Do you want to remove\n\r "${state.data.name}"`} />,
          body: <Confirmation
            onSubmit={() => submitAction()}
            onCancel={() => dispatch({ type: ModalStateAction.hide })}
          />,
        }; }

      case ModalTypes.loading:
        return {
          header: <ModalHeader title="Loading..." />,
          body: <LoadingIndicator />,
        };

      case ModalTypes.addList:
        return listFormBuilder(
          {
            title: 'Add list',
            list: {} as ListDto,
            onSubmit: (data) => {
              listService.add(data);
              dispatch({ type: ModalStateAction.hide });
            },
          },
        );

      case ModalTypes.editList:
        return listFormBuilder(
          {
            title: 'Edit list',
            list: state.data,
            onSubmit: (data) => {
              listService.edit(data);
              dispatch({ type: ModalStateAction.hide });
            },
          },
        );

      case ModalTypes.removeList:
      {
        const submitAction = () => {
          listService.remove(state.data);
          dispatch({ type: ModalStateAction.hide });
        };

        return {
          header: <ModalHeader title={`Do you want to remove\n\r "${state.data.name}"`} />,
          body: <Confirmation
            onSubmit={() => submitAction()}
            onCancel={() => dispatch({ type: ModalStateAction.hide })}
          />,
        }; }

      default:
        logger.debug(`[ModalFactory] Incorrect modal type: "${modalType}"`);
        return emptyModal;
    }
  };

  return create;
};

const ModalContainer = () => {
  const [modalContent, setModalContent] = useState<ModalModel>(emptyModal);
  const { state, dispatch } = useModalState();
  const factory = useModalContentFactory();

  const renderModal = () => {
    if (modalContent.state) {
      return (
        <modalContent.state>
          <Modal
            isVisible={state.isVisible}
            header={modalContent.header}
            body={modalContent.body}
            footer={modalContent.footer}
            onClickAway={() => dispatch({ type: ModalStateAction.hide })}
          />
        </modalContent.state>
      );
    }
    return (
      <Modal
        isVisible={state.isVisible}
        header={modalContent.header}
        body={modalContent.body}
        footer={modalContent.footer}
        onClickAway={() => dispatch({ type: ModalStateAction.hide })}
      />
    );
  };

  useEffect(() => {
    setModalContent(factory(state.type!));
  }, [state]);

  return renderModal();
};

export default ModalContainer;
