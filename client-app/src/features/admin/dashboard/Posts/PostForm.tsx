import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../../app/common/form/TextInput'

const PostForm = () => {
    return (
        <Segment>
           <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="Title"
                  value={activity.title}
                  name="title"
                  component={TextInput}
                />
                <Field
                  placeholder="Description"
                  value={activity.description}
                  name="description"
                  component={TextAreaInput}
                  rows={3}
                />
                <Field
                  placeholder="Category"
                  options={category}
                  value={activity.category}
                  name="category"
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    placeholder="Date"
                    value={activity.date}
                    date={true}
                    name="date"
                    component={DateInput}
                  />
                  <Field
                    placeholder="Time"
                    value={activity.time}
                    time={true}
                    name="time"
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  placeholder="City"
                  value={activity.city}
                  name="city"
                  component={TextInput}
                />
                <Field
                  placeholder="Venue"
                  value={activity.venue}
                  name="venue"
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  floated="right"
                  disabled={loading}
                  type="button"
                  content="Cancel"
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                />
              </Form>
            )}
          />
        </Segment>
    )
}

export default PostForm
