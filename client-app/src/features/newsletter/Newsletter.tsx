import React, { useContext } from "react";
import { Segment, Form, Button, Header, Divider } from "semantic-ui-react";
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
import { FORM_ERROR } from "final-form";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { useMediaQuery } from "react-responsive";

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
  const { isDarkMode } = rootStore.commonStore;
  const { subscribeNewsletter } = rootStore.newsletterStore;

  const isXsPhone = useMediaQuery({ query: "(max-width: 415px)" });
  const isXxsPhone = useMediaQuery({ query: "(max-width: 360px)" });

  return (
    <Segment
      inverted={isDarkMode}
      raised
      clearing
      style={{
        width: isXsPhone ? "100%" : "45%",
        maxWidth: 500,
        minWidth: isXsPhone ? 0 : 420,
        margin: "80px auto 10px auto",
        padding: isXxsPhone? 15 : 25,
        border: isDarkMode ? "1px solid rgb(64,64,64)" : "",
      }}
    >
      <Header
        as="h4"
        content="Subscribe to the Newsletter"
        style={{
          textAlign: "center",
          marginBottom: 25,
          color: isDarkMode ? "#DFDFDF" : "#121212",
        }}
      />

      <FinalForm
        onSubmit={(values: any, form: any) =>
          subscribeNewsletter(values.fullName, values.email)
            .then(() => setTimeout(form.reset))
            .catch((error: any) => ({
              [FORM_ERROR]: error,
            }))
        }
        validate={validate}
        render={({
          handleSubmit,
          invalid,
          pristine,
          submitError,
          dirtySinceLastSubmit,
          submitting,
        }) => (
          <Form inverted={isDarkMode} onSubmit={handleSubmit} error>
            <Field
              placeholder="First and last name..."
              name="fullName"
              component={TextInput}
            />

            <Field placeholder="Email..." name="email" component={TextInput} />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ width: "70%" }}>
                <strong>No spam!</strong> Will never share your email address.
                <br /> You can opt out at any time.
              </p>
              <Button
                loading={submitting}
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
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
      <Divider inverted={isDarkMode} />
      <p>
        Created by{" "}
        <a
          href="https://github.com/Joaolfelicio"
          target="_blank"
          style={{ fontWeight: 800 }}
          rel="noopener noreferrer"
        >
          Joao Felicio.
        </a>
      </p>
      <p>
        You can find the source code in
        <a
          href="https://github.com/Joaolfelicio/programming-lines"
          target="_blank"
          style={{ fontWeight: 800 }}
          rel="noopener noreferrer"
        >
          {" "}
          GitHub.
        </a>
      </p>
    </Segment>
  );
};

export default observer(Newsletter);
