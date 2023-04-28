import { ErrorMessage } from 'formik';
import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

// ## Custom Field 

// - Cầu nối giữa UI control và Formik.
// - UI control là một controlled component với props: 
// - name: tên xác định control
// - value: giá trị của control
// - onChange: trigger hàm này với giá trị mới khi có thay đổi
// - onBlur: xác định khi nào thì control này bị touched


export default function InputField(props) {
    const {
        // formik <Form /> 's props
        form,
        // formik <FastField /> 's props
        field,
        // component 's props
        type, label, placeholder, disabled
    } = props;
    const {
        // value , onChange, onBlur ,
        name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Input
                id={name}
                {...field}

                type={type}
                disabled={disabled}
                placeholder={placeholder}

                // FormFeedback is only showed when a previous component has invalid attribute or 'is-invalid' className
                invalid={showError}
            />

            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}
