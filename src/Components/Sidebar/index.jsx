import React from 'react';
import { SettingOutlined, LayoutOutlined, FileAddOutlined, ClusterOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function Sidebar() {
  const navigate = useNavigate();
  const { isCollapsed } = useSelector((state) => state.uiControlReducer);

  function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
    };
  }

  const itemsTop = [
    getItem('Project board', 'projectBoard', <LayoutOutlined className={cx('icon')} />),
    getItem('Create project', 'createProject', <FileAddOutlined className={cx('icon')} />),
    getItem('Project management', 'projectManagement', <ClusterOutlined className={cx('icon')} />),
  ];

  const itemsBottom = [getItem('Options', 'options', <SettingOutlined className={cx('icon')} />)];

  const handleClickMenuItem = ({ event, key, keyPath }) => {
    switch (key) {
      case 'projectBoard': {
        navigate('board/12464');
        break;
      }
      case 'createProject': {
        navigate('create');
        break;
      }
      case 'projectManagement': {
        navigate('management');
        break;
      }
      default: {
        console.warn('Default handleClickMenuItem');
      }
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Layout.Sider
        className={cx('sidebar')}
        collapsedWidth={80}
        width={210}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        style={{
          transition: 'all ease 0.2s',
        }}
      >
        <img className={cx('logo')} src={require('../../assets/images/logo_jira.png')} alt='logo_jira' />

        <div className={cx('menu')}>
          <Menu mode='inline' items={itemsTop} onClick={handleClickMenuItem} style={{ border: 'none' }} />

          <Menu mode='inline' items={itemsBottom} onClick={handleClickMenuItem} style={{ border: 'none' }} />
        </div>
      </Layout.Sider>
    </div>
  );
}
