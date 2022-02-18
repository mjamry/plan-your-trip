import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ModalWrapper from './ModalComponent';
import useLocationFormBuilder from './LocationDetailsForm/LocationDetailsForm';
import ModalHeader from './ModalHeader';
import Confirmation from './Confirmation';
import LoadingIndicator from './LoadingIndicator';
import useLocationService from '../../Services/LocationService';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import usePlanService from '../../Services/PlanService';
import usePlanFormBuilder from './PlanDetailsForm';
import { ModalDto } from '../../Common/Dto/ModalDto';
import { PlanEmpty } from '../../Common/Dto/PlanDto';
import SharePlanComponent from './Share/SharePlan';
import ShareStateFooter from './Share/SharePlanFooter';
import {
  hideModalState, modalState, ModalTypes,
} from '../../State/ModalState';

const emptyModal = {} as ModalDto;

// TODO extract to separate file

const useModalContentFactory = () => {
  const hideModal = useSetRecoilState(hideModalState);
  const { data: modalData } = useRecoilValue(modalState);

  const locationService = useLocationService();
  const planService = usePlanService();
  const logger = useLoggerService('ModalContentFactory');

  const locationFormBuilder = useLocationFormBuilder();
  const planFormBuilder = usePlanFormBuilder();

  const create = (modalType: ModalTypes): ModalDto => {
    switch (modalType) {
      case ModalTypes.addLocation:
        return locationFormBuilder(
          {
            title: 'Add location',
            location: modalData,
            onSubmit: (data) => {
              // TODO: add correct planID
              locationService.add(data, 0);
              hideModal({});
            },
          },
        );

      case ModalTypes.editLocation:
        return locationFormBuilder(
          {
            title: 'Edit location',
            location: modalData,
            onSubmit: (data) => {
              locationService.edit(data);
              hideModal({});
            },
          },
        );

      case ModalTypes.removeLocation:
      {
        const submitAction = () => {
          locationService.remove(modalData);
          hideModal({});
        };

        return {
          header: <ModalHeader title={`Do you want to remove\n\r "${modalData.name}"`} />,
          body: <Confirmation
            onSubmit={() => submitAction()}
            onCancel={() => hideModal({})}
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
              hideModal({});
            },
          },
        );

      case ModalTypes.editPlan:
        return planFormBuilder(
          {
            title: 'Edit plan',
            plan: modalData,
            onSubmit: (data) => {
              planService.edit(data);
              hideModal({});
            },
          },
        );

      case ModalTypes.removePlan:
      {
        const submitAction = () => {
          planService.remove(modalData);
          hideModal({});
        };

        return {
          header: <ModalHeader title={`Do you want to remove\n\r "${modalData.name}"`} />,
          body: <Confirmation
            onSubmit={() => submitAction()}
            onCancel={() => hideModal({})}
          />,
        };
      }

      case ModalTypes.sharePlan:
        return {
          header: <ModalHeader title="Share with" />,
          body: <SharePlanComponent
            usersToShare={modalData.usersToShare}
            shares={modalData.shares}
          />,
          footer: <ShareStateFooter planId={modalData.planId} />,
        };

      default:
        logger.debug(`[ModalFactory] Incorrect modal type: "${modalType}"`);
        return emptyModal;
    }
  };

  return create;
};

const ModalContainer = () => {
  const [modalContent, setModalContent] = useState<ModalDto>(emptyModal);
  const factory = useModalContentFactory();
  const { isVisible, type: modalType } = useRecoilValue(modalState);
  const hideModal = useSetRecoilState(modalState);

  const renderModal = () => (
    <ModalWrapper
      isVisible={isVisible ?? false}
      header={modalContent.header}
      body={modalContent.body}
      footer={modalContent.footer}
      onClickAway={() => hideModal({})}
    />
  );

  useEffect(() => {
    setModalContent(factory(modalType!));
  }, [modalType]);

  return renderModal();
};

export default ModalContainer;
