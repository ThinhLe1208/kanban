import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './InputField.module.scss';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const cx = classNames.bind(styles);

export default function InputField({
    label,
    name,
    value,
    error,
    touched,
    placeholder = '',
    type = 'text',
    onChange,
    onBlur,
    ...rest
}) {
    return (
        <div className={cx("wrapper")}>
            <label className={cx("label")} htmlFor={name}>{label}</label>
            <Input
                className={cx("input")}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                status={error && touched ? "error" : ""}
                style={{ width: '100%' }}
                {...rest}
            />
            {error && touched && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
}
