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
    paddingLeft: '1em',
  },
  button: {
    margin: '0.5em',
  },
});

type Props = {
  planId: number;
}

function ShareStateFooter({ planId }: Props) {
  const { state: shareState } = useShareState();
  const planService = usePlanService();
  const { dispatch: dispatchModal } = useModalState();
  const classes = useStyles();

  const handleShare = async () => {
    await planService.share(planId, shareState.usersToShare);
    dispatchModal({ type: ModalStateAction.hide });
  };

  const handleCancel = () => {
    dispatchModal({ type: ModalStateAction.hide });
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => handleShare()}
      >
        Share
      </Button>
    </div>
  );
}

export default ShareStateFooter;
