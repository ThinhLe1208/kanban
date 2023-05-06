import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import App from './App';
import { store } from './redux/configStore';
import GlobalStyle from 'components/GlobalStyle/GlobalStyle';
import themeConfig from './util/themes/antdTheme.json';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle>
      <ConfigProvider theme={themeConfig}>
        <App />
      </ConfigProvider>
    </GlobalStyle>
  </Provider>
  // </React.StrictMode>
);
