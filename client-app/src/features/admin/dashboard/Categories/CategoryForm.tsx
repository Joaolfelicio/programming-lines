import React, { useState, useContext, useEffect } from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  createValidator,
} from "revalidate";
import { FORM_ERROR } from "final-form";
import TextInput from "../../../../app/common/form/TextInput";
import ImageUploadWidget from "../../../../app/common/imageUpload/ImageUploadWidget";
import ErrorMessage from "../../../../app/common/form/ErrorMessage";
import {
  ICategoryForm,
  ICategoryFormValues,
} from "../../../../app/models/category";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const isCategoryCodeValid = createValidator(
  (message) => (value) => {
    if (value && !/^[a-z]+$/.test(value)) {
      return message;
    }
  },
  "Invalid category code"
);

const isHexaColorValid = createValidator(
  (message) => (value) => {
    if (value && !/^#(?:[0-9a-f]{3}){1,2}$/i.test(value)) {
      return message;
    }
  },
  "Invalid hexa color"
);

const validate = combineValidators({
  categoryCode: composeValidators(
    isCategoryCodeValid({ message: "Category code needs to be valid" })
  )(),
  name: isRequired("Name"),
  color: composeValidators(
    isHexaColorValid({ message: "Hexa color needs to be valid" })
  )(),
});

const labelStyle = {
  fontSize: 20,
  marginTop: 10,
  marginBottom: 5,
};

const CategoryForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    getCategoryToEdit,
    categoryToEdit,
    clearCategoryToEdit,
    editLoading,
    editCategory,
    creatingCategory,
    createCategory,
  } = rootStore.categoryStore;
  const { isDarkMode } = rootStore.commonStore;

  const [editMode, setEditMode] = useState(false);

  const [category, setCategory] = useState<ICategoryForm>(
    new ICategoryFormValues()
  );
  const [imageFiles, setImageFiles] = useState<any[]>([]);

  useEffect(() => {
    if (categoryToEdit) {
      setEditMode(true);

      const editCategory: ICategoryForm = {
        id: categoryToEdit!.id,
        code: categoryToEdit!.code,
        name: categoryToEdit!.name,
        color: categoryToEdit!.color,
        image: categoryToEdit!.image,
      };
      console.log(editCategory);

      (async function getEditImage() {
        let imageBlob = await fetch(categoryToEdit!.image as string).then((r) =>
          r.blob()
        );
        Object.assign(imageBlob, {
          preview: URL.createObjectURL(imageBlob),
        });
        setImageFiles([imageBlob]);
      })();
      setCategory(editCategory);
    }
  }, [
    setEditMode,
    getCategoryToEdit,
    setImageFiles,
    setCategory,
    categoryToEdit,
  ]);

  return (
    <Segment
      clearing
      raised
      loading={editLoading}
      inverted={isDarkMode}
      style={{ border: isDarkMode ? "1px solid rgb(64, 64, 64)" : "" }}
    >
      <Header
        content={editMode ? "Edit Category" : "New Category"}
        size="huge"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <FinalForm
        validate={validate}
        initialValues={category}
        onSubmit={(values: any) => {
          const category: ICategoryForm = {
            code: values.code,
            name: values.name,
            color: values.color,
            image: imageFiles[0],
          };
          console.log(categoryToEdit);

          if (!categoryToEdit) {
            return createCategory(category).catch((error) => ({
              [FORM_ERROR]: error,
            }));
          } else {
            return editCategory(category, categoryToEdit!.id).catch(
              (error) => ({
                [FORM_ERROR]: error,
              })
            );
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
            <label style={labelStyle}>Category code:</label>
            <Field
              placeholder="Category code"
              value={category.code}
              name="code"
              component={TextInput}
            />

            <label style={labelStyle}>Name:</label>
            <Field
              placeholder="Name"
              value={category.name}
              name="name"
              component={TextInput}
            />

            <label style={labelStyle}>Image:</label>
            <ImageUploadWidget
              width={65}
              height={65}
              setImageFiles={setImageFiles}
              imageFiles={imageFiles}
              boxSize="small"
            />

            <label style={{ ...labelStyle, marginTop: 50 }}>
              Color (#Hexacode):
            </label>
            <Field
              placeholder="#000000"
              value={category.color}
              name="color"
              component={TextInput}
            />

            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}

            <Button
              loading={submitting || creatingCategory}
              disabled={
                (invalid && !dirtySinceLastSubmit) ||
                pristine ||
                imageFiles.length === 0
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
                setCategory(new ICategoryFormValues());
                clearCategoryToEdit();
                setImageFiles([]);
              }}
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(CategoryForm);
