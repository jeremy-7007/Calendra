import React from "react";
import { useFormikContext } from "formik";

import ProfileImage from "../ProfileImage";

function ProfileImageField({ name }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <ProfileImage
      imageUri={values[name]}
      onChangeImage={(newUri) => setFieldValue(name, newUri)}
      icon="camera"
    />
  );
}

export default ProfileImageField;
