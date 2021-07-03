import React, { useContext } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";

import AuthContext from "../auth/context";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import { Form, FormField, SubmitButton } from "../components/forms";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const onLoginPress = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User no longer exists");
              return;
            }
            const user = firestoreDocument.data();
            authContext.setUser(user);
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error));
  };

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.WELCOME)} />
      <Image style={styles.logo} source={require("../assets/Calendra.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLoginPress(values)}
        validationSchema={validationSchema}
      >
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
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

export default LoginScreen;
