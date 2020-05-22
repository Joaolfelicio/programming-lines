import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field
      error={input.value.length > 0 && touched && !!error}
      type={type}
      width={width}
    >
      <input {...input} placeholder={placeholder} />
      {input.value.length > 0 && touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
