import { Chip, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import UserDto from '../../../Common/Dto/UserDto';
import { ShareStateActions, useShareState } from './ShareState';

type Props = {
  usersToShare: UserDto[],
  shares: string[],
}

const SharePlanComponent = (props: Props) => {
  const { usersToShare, shares } = props;

  const currentShares = usersToShare.filter((u) => shares.includes(u.id));
  const { state: shareState, dispatch: dispatchState } = useShareState();

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
    <>
      <div>
        Already shared with:
        <Stack direction="row" spacing={1}>
          {shareState.usersToShare.map((u) => (
            <Chip label={u.name} onDelete={() => handleRemoveFromShared(u)} />
          ))}
        </Stack>
      </div>
      <div>
        To shared with:
        <Stack direction="row" spacing={1}>
          {usersToShare
            .filter((u) => !shareState.usersToShare.includes(u))
            .map((u) => (
              <Chip label={u.name} onClick={() => handleAddToShared(u)} />
            ))}
        </Stack>
      </div>
    </>
  );
};

export default SharePlanComponent;
