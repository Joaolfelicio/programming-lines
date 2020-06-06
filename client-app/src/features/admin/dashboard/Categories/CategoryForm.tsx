import React, { useState, useContext, useEffect } from "react";
import { Segment, Header, Form, Menu, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
  createValidator,
} from "revalidate";
import { FORM_ERROR } from "final-form";
import TextInput from "../../../../app/common/form/TextInput";
import ImageUploadWidget from "../../../../app/common/imageUpload/ImageUploadWidget";
import ErrorMessage from "../../../../app/common/form/ErrorMessage";
import {
  ICategory,
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
  )()
});

const labelStyle = {
  fontSize: 20,
  marginTop: 10,
  marginBottom: 5,
};

const CategoryForm = () => {

  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const lastFragmentUrl = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );

    if (
      lastFragmentUrl.toLowerCase() !== "posts" &&
      lastFragmentUrl.toLowerCase() !== "admindashboard"
    ) {
setEditLoading(true);

      // (async function getEditImage() {
      //   let imageBlob = await fetch(IMAGEURL).then((r) =>
      //     r.blob().finally(() => setEditLoading(false))
      //   );
      //   Object.assign(imageBlob, {
      //     preview: URL.createObjectURL(imageBlob),
      //   });
      //   setImageFiles([imageBlob]);
      // })();

    }
  }, [])

  const rootStore = useContext(RootStoreContext);
  const { creatingCategory, createCategory } = rootStore.categoryStore;

  const [category, setCategory] = useState<ICategoryForm>(
    new ICategoryFormValues()
  );
  const [imageFiles, setImageFiles] = useState<any[]>([]);

  return (
    <Segment clearing raised>
      <Header
        content="New category"
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
          <Form onSubmit={handleSubmit} error>
            <label style={labelStyle}>Category code:</label>
            <Field
              placeholder="Category code"
              value={category.code}
              name="categoryCode"
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
              width={150}
              height={150}
              setImageFiles={setImageFiles}
              imageFiles={imageFiles}
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
              positive
              type="submit"
              content="Submit"
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
