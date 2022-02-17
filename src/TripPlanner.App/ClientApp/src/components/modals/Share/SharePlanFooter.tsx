import React from 'react';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSetRecoilState } from 'recoil';
import usePlanService from '../../../Services/PlanService';
import { useShareState } from './ShareState';
import { hideModalState } from '../../../State/ModalState';

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
  const hideModal = useSetRecoilState(hideModalState);
  const classes = useStyles();

  const handleShare = async () => {
    await planService.share(planId, shareState.usersToShare);
    hideModal({});
  };

  const handleCancel = () => {
    hideModal({});
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
