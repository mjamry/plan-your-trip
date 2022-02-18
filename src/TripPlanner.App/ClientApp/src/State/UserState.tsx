import { User, UserManager } from 'oidc-client';
import { atom } from 'recoil';
import { Nullable } from '../Common/Dto/Nullable';

const userManagerState = atom<Nullable<UserManager>>({
  key: 'userState.userManager',
  default: undefined,
  dangerouslyAllowMutability: true,
});

const userDataState = atom<Nullable<User>>({
  key: 'userState.data',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export { userManagerState, userDataState };
