import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Chip } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { generatePath } from 'react-router';
import usePlanService from '../Services/PlanService';
import Table from '../components/Table/Table';
import PlanDto, { PlanEmpty } from '../Common/Dto/PlanDto';
import useDateTimeFormatter from '../Common/DateTimeFormatter';
import RouteTypes from '../Common/RouteTypes';
import { ModalTypes, showModalState } from '../State/ModalState';
import { plansState, selectedPlanIdState } from '../State/PlansState';

const useStyles = makeStyles({
  container: {
    height: '90vh',
    margin: '10px',
    overflow: 'auto',
  },
});

function PlansPage() {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const planService = usePlanService();
  const dateTimeFormatter = useDateTimeFormatter();
  const navigate = useNavigate();
  const showModal = useSetRecoilState(showModalState);
  const plans = useRecoilValue(plansState);
  const selectPlan = useSetRecoilState(selectedPlanIdState);

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
          data={plans}
          onRowClick={((selectedPlan: PlanDto) => {
            selectPlan(selectedPlan.id);
            navigate(generatePath(RouteTypes.plan, { planId: `${selectedPlan.id}` }));
          })}
          edit={(plan: PlanDto) => showModal({
            type: ModalTypes.editPlan,
            data: plan,
          })}
          remove={(plan: PlanDto) => showModal({
            type: ModalTypes.removePlan,
            data: plan,
          })}
          isLoading={isLoading}
          customActions={[
            {
              icon: <AddBox />,
              title: 'add new item',
              action: () => showModal({
                type: ModalTypes.addPlan,
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
