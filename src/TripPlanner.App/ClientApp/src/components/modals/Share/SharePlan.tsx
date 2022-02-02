import { Avatar, Chip, Stack } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import UserDto from '../../../Common/Dto/UserDto';
import { ShareStateActions, useShareState } from './ShareState';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  toShare: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0.5em',
  },
  sharedWith: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0.5em',
  },
});

type Props = {
  usersToShare: UserDto[],
  shares: string[],
}

const SharePlanComponent = (props: Props) => {
  const { usersToShare, shares } = props;

  const currentShares = usersToShare.filter((u) => shares.includes(u.id));
  const { state: shareState, dispatch: dispatchState } = useShareState();
  const classes = useStyles();

  const setShares = (users: UserDto[]) => {
    dispatchState({ type: ShareStateActions.setUsers, data: users });
  };

  useEffect(() => {
    setShares(currentShares);
  }, []);

  const handleAddToShared = (user: UserDto) => {
    setShares([...shareState.usersToShare, user]);
  };

  const handleRemoveFromShared = (user: UserDto) => {
    const filteredUsers = shareState.usersToShare.filter((u) => u.id !== user.id);
    setShares(filteredUsers);
  };

  return (
    <div className={classes.root}>
      Invite:
      <div className={classes.toShare}>
        <Stack direction="row" spacing={1}>
          {usersToShare
            .filter((u) => !shareState.usersToShare.includes(u))
            .map((u) => (
              <Chip
                label={u.name}
                onClick={() => handleAddToShared(u)}
                avatar={<Avatar>{u.name.charAt(0).toUpperCase()}</Avatar>}
                variant="outlined"
                color="primary"
              />
            ))}
        </Stack>
      </div>
      Shared with:
      <div className={classes.sharedWith}>
        <Stack direction="row" spacing={1}>
          {shareState.usersToShare.map((u) => (
            <Chip
              label={u.name}
              onDelete={() => handleRemoveFromShared(u)}
              avatar={<Avatar>{u.name.charAt(0).toUpperCase()}</Avatar>}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default SharePlanComponent;
