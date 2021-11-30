import UserRegister from '../../components/UserRegister';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';
import { useSelector } from 'react-redux';
import PhoneView from '../PhoneView/PhoneView';

export default function SignUpView() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <div>{isLoggedIn ? <PhoneView /> : <UserRegister />}</div>;
}
