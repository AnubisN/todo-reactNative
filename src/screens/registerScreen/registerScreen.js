import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { authentication } from "../../utils/firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import authSlice, { setAuth } from "../../reducers/authSlice";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (name, val) => {
    setLogindata((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const registerUser = async () => {
    await createUserWithEmailAndPassword(
      authentication,
      logindata.email,
      logindata.password
    )
      .then((res) => {
        dispatch(setAuth({ id: res.user.uid }));
        navigation.navigate("Home");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={require("../../../assets/notes_logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <AntDesign name="user" size={25} color="#666" />
          </View>
          <TextInput
            value={logindata.email}
            style={styles.input}
            numberOfLines={1}
            placeholder={"Enter your email"}
            placeholderTextColor="#666"
            onChangeText={(e) => onChangeHandler("email", e)}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <AntDesign name="lock" size={25} color="#666" />
          </View>
          <TextInput
            value={logindata.password}
            style={styles.input}
            numberOfLines={1}
            placeholder={"Password"}
            placeholderTextColor="#666"
            secureTextEntry={true}
            onChangeText={(e) => onChangeHandler("password", e)}
          />
        </View>

        <TouchableOpacity
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#30BE71",
          }}
          onPress={registerUser}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navButtonText}>
            Already have an account ? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#252525",
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontSize: 28,
    // marginBottom: 10,
    color: "#FFF",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    height: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  bodyContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
