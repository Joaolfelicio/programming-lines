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
import { toJS } from "mobx";

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
  const { getCategoryToEdit, categoryToEdit } = rootStore.categoryStore;
  const { creatingCategory, createCategory } = rootStore.categoryStore;

  const [editLoading, setEditLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [category, setCategory] = useState<ICategoryForm>(
    new ICategoryFormValues()
  );
  const [imageFiles, setImageFiles] = useState<any[]>([]);

  useEffect(() => {

    console.log("categoryToEdit", toJS(categoryToEdit));
    if (categoryToEdit) {
      setEditMode(true);
      setEditLoading(true);

      const editCategory: ICategoryForm = {
        code: categoryToEdit!.code,
        name: categoryToEdit!.name,
        color: categoryToEdit!.color,
        image: categoryToEdit!.image,
      };
      console.log(editCategory);
      (async function getEditImage() {
        let imageBlob = await fetch(categoryToEdit!.image as string).then((r) =>
          r.blob().finally(() => setEditLoading(false))
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
    setEditLoading,
    getCategoryToEdit,
    setImageFiles,
    setCategory,
    categoryToEdit,
  ]);
  
  return (
    <Segment clearing raised>
      <Header
        content={editMode ? "Edit Category" : "New Category"}
        size="huge"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <FinalForm
        validate={validate}
        initialValues={category}
        onSubmit={(values: any) => {
          const newCategory: ICategoryForm = {
            code: values.categoryCode,
            name: values.name,
            color: values.color,
            image: imageFiles[0],
          };
          console.log(newCategory);
          return createCategory(newCategory).catch((error) => ({
            [FORM_ERROR]: error,
          }));
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
                setCategory(new ICategoryFormValues());
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

export default observer(CategoryForm);
