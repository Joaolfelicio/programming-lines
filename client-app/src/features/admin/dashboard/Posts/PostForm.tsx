import React, { useState } from "react";
import { Segment, Form, Button, Header, Menu } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../../app/common/form/TextInput";
import { IPostFormValues } from "../../../../app/models/post";
import TextAreaInput from "../../../../app/common/form/TextAreaInput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";

const PostForm = () => {
  const [post, setPost] = useState(new IPostFormValues());
  const [loading, setLoading] = useState(false);
  const [isContentPreview, setIsContentPreview] = useState(false);
  const [content, setContent] = useState("");

  const isValidSlug = createValidator(
    (message) => (value) => {
      if (value && !/^[a-z]+(?:-[a-z]+)*$/i.test(value)) {
        return message;
      }
    },
    "Invalid slug"
  );

  const validate = combineValidators({
    slug: composeValidators(isValidSlug({ message: "Slug needs to be valid" })),
    title: isRequired("Title"),
    subTitle: isRequired("SubTitle"),
    image: isRequired("Image"),
    content: isRequired("Content"),
    category: isRequired("Category"),
  });

  return (
    <Segment clearing>
      <Header
        content="Create a new post"
        size="huge"
        style={{ margin: 10, marginBottom: 30 }}
      />
      <FinalForm
        validate={validate}
        initialValues={post}
        onSubmit={() => console.log("hello")}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              placeholder="Slug"
              value={post.slug}
              name="slug"
              component={TextInput}
            />
            <Field
              placeholder="Title"
              value={post.title}
              name="title"
              component={TextInput}
            />
            <Field
              placeholder="SubTitle"
              value={post.subTitle}
              name="subTitle"
              component={TextInput}
            />
            {/* TODO INSERT PHOTO WIDGET HERE */}
            {/* <Field
                    placeholder="Date"
                    value={activity.date}
                    date={true}
                    name="date"
                    component={DateInput}
                  /> */}
            <Menu tabular style={{marginBottom: 0}}>
              <Menu.Item
                name="Write"
                active={!isContentPreview}
                onClick={() => setIsContentPreview(false)}
              />
              <Menu.Item
                name="Preview"
                active={isContentPreview}
                onClick={() => setIsContentPreview(true)}
              />
            </Menu>

            {isContentPreview ? (
              <ReactMarkdown escapeHtml={false} skipHtml={false} source="# TEST" />) : 
              (<Field
              placeholder="Content"
              value={post.content}
              name="content"
              component={TextAreaInput}
              rows={20}
              OnChange={(e: any) => console.log(e)}
            />
            )}

            {/* TODO: FETCH THE AVAILABLES CATEGORIES AND PUT IT IN A SELECT */}
            <Field
              placeholder="Category"
              value={post.categoryCode}
              name="category"
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
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(PostForm);
