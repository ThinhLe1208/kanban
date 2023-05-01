import { Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { history } from 'util/history';
import 'App.css';
import HomeTemplate from 'templates/HomeTemplate';
import Home from 'pages/Home';
import UserSigninTemplate from 'templates/UserSigninTemplate';
import Signin from 'pages/Signin';
import ProjectTemplate from 'templates/ProjectTemplate';
import ProjectBoard from 'pages/ProjectBoard';
import ProjectCreate from 'pages/ProjectCreate';
import ProjectManagement from 'pages/ProjectManagement';
import CustomDrawer from 'HOC/Drawer/CustomDrawer';
import { useSelector } from 'react-redux';
import LoadingComponent from 'components/GlobalSetting/LoadingComponent/LoadingComponent';

function App() {
  const { isLoading } = useSelector(state => state.loadingReducer);

  return (
    <>
      <CustomDrawer />
      {isLoading && <LoadingComponent />}

      {/* Use historyRouter to redirect in redux-saga */}
      <HistoryRouter history={history}>
        {/* <BrowserRouter> */}
        <Routes>

          <Route path='' element={<HomeTemplate />} >
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='*' element={<Navigate to='' />} />
          </Route>

          <Route path='signin' element={<UserSigninTemplate />} >
            <Route index element={<Signin />} />
          </Route>

          <Route path='project' element={<ProjectTemplate />}>
            <Route index element={<ProjectBoard />} />
            <Route path='board/:projectId' element={<ProjectBoard />} />
            <Route path='create' element={<ProjectCreate />} />
            <Route path='management' element={<ProjectManagement />} />
            <Route path='*' element={<Navigate to='board' />} />
          </Route>

        </Routes>
        {/* </BrowserRouter> */}
      </HistoryRouter >
    </>
  );
}

export default App;
