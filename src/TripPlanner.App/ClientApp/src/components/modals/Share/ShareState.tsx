import { atom } from 'recoil';
import UserDto from '../../../Common/Dto/UserDto';

const shareState = atom<UserDto[]>({
  key: 'shareState',
  default: [],
});

export default shareState;
