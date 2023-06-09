import React from 'react';
import { Select, Tag } from 'antd';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import ErrorMessage from 'components/ErrorMessage';
import { useDispatch } from 'react-redux';
import { updatePrioritySagaAction, updateStatusSagaAction } from 'redux/sagas/actions/taskAction';

const cx = classNames.bind(styles);

export default function SelectField({
  label,
  name,
  value,
  error,
  touched,
  placeholder = '',
  onChange,
  onBlur,
  list = [],
  listLabel,
  listValue,
  api = false,
  taskDetail,
  ...rest
}) {
  const dispatch = useDispatch();

  // style tags in the select
  const tagRender = (props) => {
    const { label, /* value , */ closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color='cyan'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  // antd handler doesnt give a event param so fake an event for a handler
  const customHandleChangeAntd = (value, name) => {
    if (api) {
      switch (name) {
        case 'statusId':
          dispatch(updateStatusSagaAction(taskDetail.taskId, value, taskDetail.projectId));
          break;
        case 'priorityId':
          dispatch(updatePrioritySagaAction(taskDetail.taskId, value, taskDetail.projectId));
          break;
        default:
      }
    }
    const changeEvent = {
      target: {
        name,
        value,
      },
    };
    onChange(changeEvent);
  };

  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')} htmlFor={name}>
        {label}
      </label>

      <Select
        className={cx('input')}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(value) => customHandleChangeAntd(value, name)}
        onBlur={onBlur}
        status={error && touched ? 'error' : ''}
        tagRender={tagRender}
        {...rest}
      >
        {list?.map((item, index) => (
          <Select.Option key={index} value={item[listValue]}>
            {item[listLabel]}
          </Select.Option>
        ))}
      </Select>

      {error && touched && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
