import React from 'react';
import { Button, Drawer, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideOffcanvas } from 'redux/reducers/offcanvasReducer';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import Title from 'components/Title';

const cx = classNames.bind(styles);

export default function Offcanvas() {
  const { isOpen, title, icon, aceptBtn, showBtn, offcanvasContent, handleSubmitOffcanvas } = useSelector(
    (state) => state.offcanvasReducer
  );
  const dispatch = useDispatch();

  const handlehideOffcanvas = () => {
    dispatch(hideOffcanvas());
  };

  return (
    <Drawer
      className={cx('wrapper')}
      title={<Title icon={icon}>{title}</Title>}
      width='auto'
      headerStyle={window.innerWidth < 576 ? { padding: '10px' } : { padding: '10px 20px' }}
      bodyStyle={{ padding: '0', backgroundColor: 'var(--grey)' }}
      closable={false}
      destroyOnClose={true}
      onClose={handlehideOffcanvas}
      open={isOpen}
      contentWrapperStyle={{ boxShadow: 'none' }}
      extra={
        showBtn ? (
          <Space>
            <Button onClick={handlehideOffcanvas}>Cancel</Button>
            <Button type='primary' onClick={handleSubmitOffcanvas}>
              {aceptBtn}
            </Button>
          </Space>
        ) : (
          <div className={cx('closeBtn')} onClick={handlehideOffcanvas}>
            <CloseOutlined />
          </div>
        )
      }
    >
      {offcanvasContent}
    </Drawer>
  );
}
