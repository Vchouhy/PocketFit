import React, { Component, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import postRegisterUser from "../../../api/post-register";
import { ButtonGreen } from "../Authentication.styles";
import { Styles } from "../Authentication.styles";
import { useSelector, useDispatch } from "react-redux";
import signIn from "../../../redux/Actions/actions-User";

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.reducerUser.user);

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const DateGenerate = () => {
    const date = new Date();
    const format = `${date.getFullYear()}-${date.getMonth() + 1
      }-${date.getUTCDate()}`;
    return format;
  };

  const handleInputChange = (e, type) => {
    setInput({
      ...input,
      [type]: e.nativeEvent.text,
    });
  };

  const handleOnSubmit = async () => {
    try {
      if (input.name.length > 1 && input.lastname.length > 1 && input.email.length > 1 && input.password.length > 1 && input.repeatPassword.length > 1) {
        let datos
        if (input.password === input.repeatPassword) {
          datos = {
            paymentday: DateGenerate(),
            name: input.name,
            lastname: input.lastname,
            email: input.email,
            password: input.password,
          };
        } else Alert.alert("Error", "Las contraseñas no coinciden")

        const res = await postRegisterUser(datos);
        dispatch(signIn(res.data));
        if (res.data === "User is already registered") {
          Alert.alert("Error", "El usuario ya existe")
        } else {
          Alert.alert("Exito", "Te has registrado correctamente")
          navigation.navigate("Inicio")
        };
      } else Alert.alert("Error", "Por favor completa todos los campos")
    } catch (e) {
      Alert.alert("Error", "No se pudo iniciar sesion");
    }
  };

  return (
    <View>
      <View style={{ width: 300 }}>
        <Text style={{ color: "white", marginLeft: 10 }}>Nombre</Text>
        <Input
          style={Styles.Input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="Nombre"
          value={input.name}
          onChange={(e) => handleInputChange(e, "name")}
        />

        <Text style={{ color: "white", marginLeft: 10 }}>Apellido</Text>
        <Input
          style={Styles.Input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="Apellido"
          value={input.lastname}
          onChange={(e) => handleInputChange(e, "lastname")}
        />

        <Text style={{ color: "white", marginLeft: 10 }}>E-mail</Text>
        <Input
          style={Styles.Input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="user@example.com"
          value={input.email}
          onChange={(e) => handleInputChange(e, "email")}
        />

        <Text style={{ color: "white", marginLeft: 10 }}>Contraseña</Text>
        <Input
          style={Styles.Input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="**********"
          value={input.password}
          onChange={(e) => handleInputChange(e, "password")}
          secureTextEntry={true}
        />

        <Text style={{ color: "white", marginLeft: 10 }}>Repetir Contraseña</Text>
        <Input
          style={Styles.Input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="**********"
          value={input.repeatPassword}
          onChange={(e) => handleInputChange(e, "repeatPassword")}
          secureTextEntry={true}
        />
      </View>
      <View>
        <ButtonGreen
          onPress={() => handleOnSubmit()}
        >
          <Text style={{ alignSelf: "center" }}>Registrarse</Text>
        </ButtonGreen>
      </View>
    </View>
  );
}
