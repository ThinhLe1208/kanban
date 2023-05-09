import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { Col, Row, Slider } from 'antd';
import { useDispatch } from 'react-redux';
import { updateOriginalEstimateSagaAction } from 'redux/sagas/actions/taskAction';

const cx = classNames.bind(styles);

export default function SliderField({
  label,
  name,
  spentValue,
  remainValue,
  onChange,
  disabled = false,
  api = false,
  taskDetail,
}) {
  const dispatch = useDispatch();
  const customHandleChangeAntd = (value, name) => {
    if (api) {
      dispatch(updateOriginalEstimateSagaAction(taskDetail.taskId, value, taskDetail.projectId));
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
      <Slider
        name={name}
        id={name}
        value={spentValue}
        disabled={disabled}
        min={0}
        max={spentValue + remainValue}
        onChange={(value) => customHandleChangeAntd(value, 'timeTrackingSpent')}
        trackStyle={{ bachground: 'red' }}
      />

      <Row>
        <Col span={12}>
          <p>{spentValue !== 0 ? `${spentValue}h logged` : 'No time logged'}</p>
        </Col>
        <Col span={12}>
          <p style={{ textAlign: 'right' }}>
            {remainValue ? `${remainValue}h remaining` : `${spentValue + remainValue}h estimated`}
          </p>
        </Col>
      </Row>
    </div>
  );
}
