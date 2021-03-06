import { Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import AppBar from '../AppBar/AppBar';
import Container from '../Container/Container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/auth/auth-operations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIsFetchCurrentUser } from '../../redux/auth/auth-selectors';

import './App.css';
import PrivateRoute from '../PrivatRoute/PrivatRoute';
import PublicRoute from '../PublicRoute/PublicRoute';

const HomeView = lazy(() =>
  import('../../views/HomeView/HomeView' /* webpackChunkName: "home-view" */),
);
const SignUpView = lazy(() =>
  import(
    '../../views/SignUpView/SignUpView' /* webpackChunkName: "sign-up-view" */
  ),
);

const LoginView = lazy(() =>
  import(
    '../../views/LoginView/LoginView' /* webpackChunkName: "login-view" */
  ),
);

const PhoneView = lazy(() =>
  import(
    '../../views/PhoneView/PhoneView' /* webpackChunkName: "phone-view" */
  ),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchCurrentUser = useSelector(getIsFetchCurrentUser);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return !isFetchCurrentUser ? (
    <Loader />
  ) : (
    <div className="Container">
      <AppBar />
      <Container>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <PhoneView />
            </PrivateRoute>
            <PublicRoute exact path="/signup" restricted>
              <SignUpView />
            </PublicRoute>
            <PublicRoute exact path="/login" restricted>
              <LoginView />
            </PublicRoute>
          </Switch>
        </Suspense>
      </Container>
      <ToastContainer />
    </div>
  );
}
