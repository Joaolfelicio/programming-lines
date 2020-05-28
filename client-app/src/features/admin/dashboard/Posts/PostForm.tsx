import React, { useState, Fragment, useContext } from "react";
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
  hasLengthGreaterThan,
} from "revalidate";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../../../app/common/syntaxHighlight/CodeBlock";
import { OnChange } from "react-final-form-listeners";
import { ImageUploadWidget } from "./ImageUpload/ImageUploadWidget";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import DropdownCategories from "../Categories/DropdownCategories";
const readingTime = require("reading-time");

const PostForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createPost, creatingPost } = rootStore.postStore;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<any[]>([]);

  const [post, setPost] = useState(new IPostFormValues());
  const [loading, setLoading] = useState(false);
  const [isContentPreview, setIsContentPreview] = useState(false);
  const [content, setContent] = useState("");

  const isValidSlug = createValidator(
    (message) => (value) => {
      if (value && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
        return message;
      }
    },
    "Invalid slug"
  );

  const labelStyle = {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  };

  const validate = combineValidators({
    slug: composeValidators(
      isValidSlug({ message: "Slug needs to be valid" })
    )(),
    title: composeValidators(
      isRequired("Title"),
      hasLengthGreaterThan(6)({
        message: "Title needs to be at least 6 characters",
      })
    )(),
    subTitle: isRequired("SubTitle"),
    content: isRequired("Content"),
  });

  const handleFormSubmit = (values: any) => {
    const newPost: IPostFormValues = {
      slug: values.slug,
      title: values.title,
      subTitle: values.subTitle,
      content: values.content,
      image: imageFiles[0],
      categoryCode: selectedCategory,
    };
    console.log(newPost);
    createPost(newPost);
  };

  return (
    <Segment clearing raised>
      <Header
        content="New post"
        size="huge"
        style={{ margin: 10, marginBottom: 10 }}
      />
      <FinalForm
        validate={validate}
        initialValues={post}
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <label style={labelStyle}>Slug:</label>
            <Field
              placeholder="Slug"
              value={post.slug}
              name="slug"
              component={TextInput}
            />

            <label style={labelStyle}>Title:</label>
            <Field
              placeholder="Title"
              value={post.title}
              name="title"
              component={TextInput}
            />

            <label style={labelStyle}>SubTitle:</label>
            <Field
              placeholder="SubTitle"
              value={post.subTitle}
              name="subTitle"
              component={TextInput}
            />

            <label style={labelStyle}>Category:</label>
            <DropdownCategories setSelectedCategory={setSelectedCategory} />

            <label style={labelStyle}>Image:</label>
            <ImageUploadWidget
              setImageFiles={setImageFiles}
              imageFiles={imageFiles}
            />

            <Menu tabular style={{ marginBottom: 0, marginTop: 50 }}>
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
              <Menu.Item name={readingTime(content).text} />
              <Menu.Item name={`${readingTime(content).words} words`} />
            </Menu>

            {isContentPreview ? (
              <ReactMarkdown
                className="markdown-body admin-preview"
                source={content}
                skipHtml={false}
                escapeHtml={false}
                renderers={{
                  code: CodeBlock,
                }}
              />
            ) : (
              <Fragment>
                <Field
                  placeholder="Content"
                  value={post.content}
                  name="content"
                  component={TextAreaInput}
                  rows={31}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />
                <OnChange name="content">
                  {(value) => {
                    setContent(value);
                  }}
                </OnChange>
              </Fragment>
            )}

            <Button
              loading={submitting || creatingPost}
              disabled={
                loading ||
                invalid ||
                pristine ||
                imageFiles.length === 0 ||
                selectedCategory.length === 0
              }
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              disabled={loading}
              // TODO: Fix the on clear
              onClick={() => setPost(new IPostFormValues())}
              type="button"
              content="Clear"
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(PostForm);
