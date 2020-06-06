import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Header, Menu } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../../app/common/form/TextInput";
import { IPostFormValues, IPostsForm } from "../../../../app/models/post";
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
import { ImageUploadWidget } from "../../../../app/common/imageUpload/ImageUploadWidget";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import DropdownCategories from "../Categories/DropdownCategories";
import { FORM_ERROR } from "final-form";
import ErrorMessage from "../../../../app/common/form/ErrorMessage";
const readingTime = require("reading-time");

const PostForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createPost,
    creatingPost,
    getDetailedPost,
    detailedPost,
    editPost,
  } = rootStore.postStore;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<any[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [post, setPost] = useState<IPostsForm>(new IPostFormValues());
  const [isContentPreview, setIsContentPreview] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const lastFragmentUrl = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    if (
      lastFragmentUrl.toLowerCase() !== "posts" &&
      lastFragmentUrl.toLowerCase() !== "admindashboard"
    ) {
      setEditMode(true);
      setEditLoading(true);
      getDetailedPost(lastFragmentUrl);
      const editPost: IPostsForm = {
        slug: detailedPost!.slug,
        title: detailedPost!.title,
        subTitle: detailedPost!.subTitle,
        image: detailedPost!.image,
        content: detailedPost!.content,
        categoryCode: detailedPost!.category.code,
        id: detailedPost!.id,
      };

      (async function getEditImage() {
        let imageBlob = await fetch(editPost.image as string).then((r) =>
          r.blob().finally(() => setEditLoading(false))
        );
        Object.assign(imageBlob, {
          preview: URL.createObjectURL(imageBlob),
        });
        setImageFiles([imageBlob]);
      })();
      setSelectedCategory(editPost.categoryCode);
      setPost(editPost);
    }
  }, [setEditMode, getDetailedPost, setPost, setImageFiles, setEditLoading]);

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

  return (
    <Segment clearing raised>
      <Header
        content={editMode ? "Edit Post" : "New Post"}
        size="huge"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <FinalForm
        validate={validate}
        initialValues={post}
        onSubmit={(values: any) => {
          const newPost: IPostFormValues = {
            slug: values.slug,
            title: values.title,
            subTitle: values.subTitle,
            content: values.content,
            image: imageFiles[0],
            categoryCode: selectedCategory,
          };
          console.log(newPost);
          console.log("PostId", post.id);
          //If it's a new post
          if (!post.id) {
            return createPost(newPost).catch((error) => ({
              [FORM_ERROR]: error,
            }));
          } else {
            return editPost(newPost, post.id!).catch((error) => ({
              [FORM_ERROR]: error,
            }));
          }
        }}
        render={({
          handleSubmit,
          invalid,
          pristine,
          submitting,
          submitError,
          dirtySinceLastSubmit,
        }) => (
          <Form onSubmit={handleSubmit} error loading={editLoading}>
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
            <DropdownCategories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <label style={labelStyle}>Image:</label>
            {}
            <ImageUploadWidget
              width={670}
              height={305}
              setImageFiles={setImageFiles}
              imageFiles={imageFiles}
              boxSize="big"
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

            <div style={{ display: isContentPreview ? "initial" : "none" }}>
              <ReactMarkdown
                className="markdown-body admin-preview"
                source={content}
                skipHtml={false}
                escapeHtml={false}
                renderers={{
                  code: CodeBlock,
                }}
              />
            </div>
            <div style={{ display: isContentPreview ? "none" : "initial" }}>
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
            </div>

            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}

            <Button
              loading={submitting || creatingPost}
              disabled={
                (invalid && !dirtySinceLastSubmit) ||
                pristine ||
                imageFiles.length === 0 ||
                selectedCategory.length === 0
              }
              style={{ marginTop: 20, marginLeft: 20 }}
              floated="right"
              positive={!editMode}
              primary={editMode}
              type="submit"
              content={editMode ? "Edit" : "Create"}
            />
            <Button
              floated="right"
              disabled={submitting}
              style={{ marginTop: 20 }}
              onClick={() => {
                setEditMode(false);
                setPost(new IPostFormValues());
                setSelectedCategory("");
                setImageFiles([]);
              }}
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
