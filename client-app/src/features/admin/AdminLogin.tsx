import React, { useContext, useEffect } from "react";
import {
  combineValidators,
  isRequired,
  createValidator,
  composeValidators,
} from "revalidate";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/adminUser";
import { FORM_ERROR } from "final-form";
import { Form, Header, Button, Grid, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { history } from "../..";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const validate = combineValidators({
  email: composeValidators(
    isRequired({ message: "Email is required." }),
    isValidEmail({ message: "Email pattern is not valid." })
  )(),
  password: isRequired("Password"),
});

const AdminLogin = () => {
  const rootStore = useContext(RootStoreContext);
  const { loginAdminUser, adminUser } = rootStore.userStore;
  const { isDarkMode } = rootStore.commonStore;

  useEffect(() => {
    if (adminUser) {
      history.push("/admindashboard");
    }
  }, [adminUser]);

  return (
    <Grid
      textAlign="center"
      style={{ marginTop: "20vh" }}
      inverted={isDarkMode}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <FinalForm
          onSubmit={(values: IUserFormValues) =>
            loginAdminUser(values).catch((error) => ({
              [FORM_ERROR]: error,
            }))
          }
          validate={validate}
          render={({
            handleSubmit,
            submitting,
            submitError,
            invalid,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Segment
              stacked
              inverted={isDarkMode}
              style={{ border: isDarkMode ? "1px solid rgb(64, 64, 64)" : "" }}
            >
              <Form
                onSubmit={handleSubmit}
                error
                style={{ textAlign: "left" }}
                inverted={isDarkMode}
              >
                <Header
                  as="h2"
                  content="Login"
                  textAlign="center"
                  style={{ color: isDarkMode ? "#DFDFDF" : "#121212" }}
                />
                <Field
                  fluid
                  name="email"
                  component={TextInput}
                  placeholder="Email"
                />
                <Field
                  name="password"
                  component={TextInput}
                  placeholder="Password"
                  type="password"
                  fluid
                />
                {submitError && !dirtySinceLastSubmit && (
                  <ErrorMessage error={submitError} />
                )}
                <Button
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  loading={submitting}
                  primary
                  fluid
                  content="Login"
                />
              </Form>
            </Segment>
          )}
        />
      </Grid.Column>
    </Grid>
  );
};

export default observer(AdminLogin);
