import React from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from 'util/history';
import AuthenticationTemplate from 'templates/AuthenticationTemplate';
import ProjectTemplate from 'templates/ProjectTemplate';
import ProjectBoard from 'pages/ProjectBoard';
import ProjectCreate from 'pages/ProjectCreate';
import ProjectManagement from 'pages/ProjectManagement';
import Offcanvas from 'components/Offcanvas';
import Loading from 'components/Loading';
import SignIn from 'pages/SingIn';
import SignUp from 'pages/SignUp';
import Error from 'pages/Error';

function App() {
  const { isLoading } = useSelector(state => state.uiControlReducer);

  return (
    <div className='app'>

      <Offcanvas />
      {isLoading && <Loading />}

      {/* Use historyRouter to redirect in redux-saga */}
      <HistoryRouter history={history}>
        {/* <BrowserRouter> */}
        <Routes>

          <Route path='' element={<AuthenticationTemplate />} >
            <Route index element={<SignIn />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to='' />} />
          </Route>

          <Route path='project' element={<ProjectTemplate />}>
            <Route index element={<ProjectBoard />} />
            <Route path='board/:projectId' element={<ProjectBoard />} />
            <Route path='create' element={<ProjectCreate />} />
            <Route path='management' element={<ProjectManagement />} />
            <Route path='*' element={<Navigate to='board' />} />
          </Route>

          <Route path='error' element={<Error />} />

        </Routes>
        {/* </BrowserRouter> */}
      </HistoryRouter >
    </div>
  );
}

export default App;
