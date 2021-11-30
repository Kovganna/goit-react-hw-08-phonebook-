import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';
import s from './HomeView.module.css';

export default function HomeView() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div className={s.container}>
      {isLoggedIn ? (
        <h1 className={s.title}>You can open Phonebook!</h1>
      ) : (
        <h1 className={s.title}>Please, SignUp or Login!</h1>
      )}
    </div>
  );
}
