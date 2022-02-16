import { UserManager } from 'oidc-client';
import { atom } from 'recoil';
import { Nullable } from '../Common/Dto/Nullable';

const userManagerState = atom<Nullable<UserManager>>({
  key: 'userState.userManager',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export default userManagerState;
