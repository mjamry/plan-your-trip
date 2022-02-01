import React from 'react';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import usePlanService from '../../../Services/PlanService';
import { ModalStateAction, useModalState } from '../../../State/ModalState';
import { useShareState } from './ShareState';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDIrection: 'row',
    justifyContent: 'end',
  },
});

type Props = {
  planId: number;
}

const ShareStateFooter = ({ planId }: Props) => {
  const { state: shareState } = useShareState();
  const planService = usePlanService();
  const { dispatch: dispatchModal } = useModalState();
  const classes = useStyles();

  const handleShare = async () => {
    await planService.share(planId, shareState.usersToShare);
    dispatchModal({ type: ModalStateAction.hide });
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleShare()}
      >
        Share
      </Button>
    </div>
  );
};

export default ShareStateFooter;
