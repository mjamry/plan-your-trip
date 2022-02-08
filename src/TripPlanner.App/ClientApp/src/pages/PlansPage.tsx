import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { RouteComponentProps } from 'react-router-dom';
import { Chip } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { usePlansState, PlansStateActions } from '../State/PlansState';
import usePlanService from '../Services/PlanService';
import { useModalState, ModalStateAction, ModalTypes } from '../State/ModalState';
import Table from '../components/Table/Table';
import PlanDto, { PlanEmpty } from '../Common/Dto/PlanDto';
import useDateTimeFormatter from '../Common/DateTimeFormatter';

const useStyles = makeStyles({
  container: {
    height: '90vh',
    margin: '10px',
    overflow: 'auto',
  },
});

interface Props extends RouteComponentProps<any>{}

function PlansPage({ history }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { state: planState, dispatch: dispatchPlan } = usePlansState();
  const { dispatch: dispatchModal } = useModalState();
  const classes = useStyles();
  const planService = usePlanService();
  const dateTimeFormatter = useDateTimeFormatter();

  useEffect(() => {
    const fetchPlanData = async () => {
      setIsLoading(true);
      await planService.getAll();
      setIsLoading(false);
    };

    fetchPlanData();
  }, []);

  return (
    <div className="">
      <div className={classes.container}>
        <Table
          columns={[
            {
              headerName: 'Name',
              field: 'name',
            },
            {
              headerName: 'Description',
              field: 'description',
              flex: 3,
            },
            {
              headerName: 'Updated',
              field: 'updated',
              type: 'datetime',
              valueFormatter: (params: any) => dateTimeFormatter.format(params.value),
            },
            {
              headerName: 'Created',
              field: 'created',
              type: 'datetime',
              valueFormatter: (params: any) => dateTimeFormatter.format(params.value),
            },
            {
              headerName: 'Private',
              field: 'isPrivate',
              type: 'boolean',
              renderCell: (params: any) => (params.row.isPrivate ? <Chip label="Private" /> : <Chip label="Public" />),
            },
          ]}
          data={planState.plans}
          onRowClick={((selectedPlan: PlanDto) => {
            dispatchPlan({ type: PlansStateActions.selectPlan, data: selectedPlan.id });
            history.push(`/locations/${selectedPlan.id}`);
          })}
          edit={(plan: PlanDto) => dispatchModal({
            type: ModalStateAction.show,
            modalType: ModalTypes.editPlan,
            data: plan,
          })}
          remove={(plan: PlanDto) => dispatchModal({
            type: ModalStateAction.show,
            modalType: ModalTypes.removePlan,
            data: plan,
          })}
          isLoading={isLoading}
          customActions={[
            {
              icon: <AddBox />,
              title: 'add new item',
              action: () => dispatchModal({
                type: ModalStateAction.show,
                modalType: ModalTypes.addPlan,
                data: PlanEmpty,
              }),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default PlansPage;
