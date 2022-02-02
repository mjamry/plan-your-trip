import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalComponent';
import { useModalState, ModalTypes, ModalStateAction } from '../../State/ModalState';
import useLocationFormBuilder from './LocationDetailsForm/LocationDetailsForm';
import ModalHeader from './ModalHeader';
import Confirmation from './Confirmation';
import LoadingIndicator from './LoadingIndicator';
import useLocationService from '../../Services/LocationService';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import usePlanService from '../../Services/PlanService';
import usePlanFormBuilder from './PlanDetailsForm';
import { ModalDto } from '../../Common/Dto/ModalDto';
import { LocationFormStateProvider } from './LocationDetailsForm/LocationDetailsFormState';
import { PlanEmpty } from '../../Common/Dto/PlanDto';
import SharePlanComponent from './Share/SharePlan';
import ShareStateFooter from './Share/SharePlanFooter';
import { ShareStateProvider } from './Share/ShareState';

const emptyModal = {} as ModalDto;

type ModalModel = ModalDto | ModalDto<typeof LocationFormStateProvider>;

// TODO extract to separate file

const useModalContentFactory = () => {
  const { state, dispatch } = useModalState();
  const locationService = useLocationService();
  const planService = usePlanService();
  const logger = useLoggerService('ModalContentFactory');

  const locationFormBuilder = useLocationFormBuilder();
  const planFormBuilder = usePlanFormBuilder();

  const create = (modalType: ModalTypes): ModalModel => {
    switch (modalType) {
      case ModalTypes.addLocation:
        return locationFormBuilder(
          {
            title: 'Add location',
            location: state.data,
            onSubmit: (data) => {
              // TODO: add correct planID
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

      case ModalTypes.addPlan:
        return planFormBuilder(
          {
            title: 'Add plan',
            plan: PlanEmpty,
            onSubmit: (data) => {
              planService.add(data);
              dispatch({ type: ModalStateAction.hide });
            },
          },
        );

      case ModalTypes.editPlan:
        return planFormBuilder(
          {
            title: 'Edit plan',
            plan: state.data,
            onSubmit: (data) => {
              planService.edit(data);
              dispatch({ type: ModalStateAction.hide });
            },
          },
        );

      case ModalTypes.removePlan:
      {
        const submitAction = () => {
          planService.remove(state.data);
          dispatch({ type: ModalStateAction.hide });
        };

        return {
          header: <ModalHeader title={`Do you want to remove\n\r "${state.data.name}"`} />,
          body: <Confirmation
            onSubmit={() => submitAction()}
            onCancel={() => dispatch({ type: ModalStateAction.hide })}
          />,
        };
      }

      case ModalTypes.sharePlan:
        return {
          header: <ModalHeader title="Share with" />,
          body: <SharePlanComponent
            usersToShare={state.data.usersToShare}
            shares={state.data.shares}
          />,
          footer: <ShareStateFooter planId={state.data.planId} />,
          state: ShareStateProvider,
        };

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
          <ModalWrapper
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
      <ModalWrapper
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
