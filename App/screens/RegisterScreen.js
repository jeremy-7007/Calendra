import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebase/config";

import { Form, FormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import ProfileImageField from "../components/forms/ProfileImageField";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required().label("Display name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function RegisterScreen({ navigation }) {
  const onRegisterPress = (values) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);
  };

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.WELCOME)} />
      <Form
        initialValues={{
          displayName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={(values) => onRegisterPress(values)}
        validationSchema={validationSchema}
      >
        <ProfileImageField name="profileImage" />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="displayName"
          placeholder="Display name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-outline"
          name="passwordConfirmation"
          placeholder="Repeat password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" color="secondary" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
