import React, { useState, Fragment, useContext } from "react";
import {
  Segment,
  Form,
  FormField,
  Label,
  Button,
  Header,
} from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  createValidator,
} from "revalidate";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { FORM_ERROR } from "final-form";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const validate = combineValidators({
  fullName: composeValidators(
    isRequired({ message: "Full Name is required." }),
    hasLengthGreaterThan(6)({ message: "Minimum length is 6 characters." })
  )(),
  email: composeValidators(
    isRequired({ message: "Email is required." }),
    isValidEmail({ message: "Email pattern is not valid." })
  )(),
});

const Newsletter = () => {
  const rootStore = useContext(RootStoreContext);
  const { subscribeNewsletter, appLoading } = rootStore.commonStore;

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
    subscribeNewsletter(values.fullName, values.email);
  };
  return (
    <Segment raised
      clearing
      style={{ width: "45%", maxWidth: 500, margin: "80px auto" }}
    >
      <Header
        as="h4"
        content="Subscribe to the newsletter"
        style={{ textAlign: "center", marginBottom: 25 }}
      />

      <FinalForm
        onSubmit={(values: any) => {
          console.log(values);
          subscribeNewsletter(values.fullName, values.email).catch((error) => ({
            [FORM_ERROR]: error,
          }));
        }}
        validate={validate}
        render={({
          handleSubmit,
          invalid,
          pristine,
          submitError,
          dirtySinceLastSubmit,
          submitting,
        }) => (
          <Form onSubmit={handleSubmit} error>
            <Field
              placeholder="Full Name..."
              name="fullName"
              component={TextInput}
            />

            <Field placeholder="Email..." name="email" component={TextInput} />

            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ width: "70%" }}>
                <strong>No spam!</strong> Will never share your email address
                and you can opt out at any time.
              </p>
              <Button
                loading={submitting}
                disabled={
                  (invalid && !dirtySinceLastSubmit) || pristine || appLoading
                }
                floated="right"
                positive
                type="submit"
                content="Submit"
                style={{ height: 40 }}
              />
            </div>
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(Newsletter);
