import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { Avatar, Badge, Button, Popover } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSidebar } from 'redux/reducers/uiControlReducer';
import UserPopover from 'components/UserPopover/UserPopover';

const cx = classNames.bind(styles);

export default function Header() {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.uiControlReducer);
  const { currentUser } = useSelector((state) => state.userReducer);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('leftSide')}>
        <Button
          className={cx('sidebarBtn', 'iconBtn')}
          type='text'
          icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setSidebar())}
        />
      </div>

      <div className={cx('rightSide')}>
        <Button
          className={cx('sidebarBtn', 'iconBtn')}
          type='text'
          icon={
            <Badge count={3} color='var(--info)' size='small' style={{ fontSize: '8px' }}>
              <FontAwesomeIcon icon={faMessage} className={cx(`icon`)} />
            </Badge>
          }
        />

        <Button
          className={cx('sidebarBtn', 'iconBtn')}
          type='text'
          icon={
            <Badge count={6} color='var(--error)' size='small' style={{ fontSize: '8px' }}>
              <FontAwesomeIcon icon={faBell} className={cx(`icon`)} />
            </Badge>
          }
        />

        <div className={cx(`divider`)} />

        <Popover content={<UserPopover currentUser={currentUser} />} trigger='click' placement='bottomRight'>
          <Button className={cx(`userBtn`)} type='text'>
            <Avatar className={cx('avatar')} src={currentUser.avatar} />

            <span>
              Hi, <span className={cx(`name`)}>{currentUser.name}</span>
            </span>

            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </Popover>
      </div>
    </div>
  );
}
