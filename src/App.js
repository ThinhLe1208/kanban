import { Routes, Route, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import { history } from './util/history';
import './App.css';
import HomeTemplate from './Templates/HomeTemplate';
import Home from './Pages/Home';
import UserSigninTemplate from './Templates/UserSigninTemplate';
import Signin from './Pages/Signin';
import ProjectTemplate from './Templates/ProjectTemplate';
import ProjectBoard from './Pages/ProjectBoard';
import ProjectSettings from './Pages/ProjectSettings';

function App() {
  return (
    // Sử dụng historyRouter để redirect trong redux-saga
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
          <Route path='settings' element={<ProjectSettings />} />
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </HistoryRouter >
  );
}

export default App;
