import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import signIn from "../../redux/Actions/actions-User";
import postLoginUser from "../../api/post-login";
import { useDispatch } from "react-redux";

const Loading = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    getData()

    const timer = setTimeout(() => {
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem('isLogged')
    if (value === "true") {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");
      const res = await postLoginUser({
        email: email,
        password: password
      });
      dispatch(signIn(res.data.passport.user));
      navigation.navigate('Inicio');
    } else navigation.navigate('Authentication')
  }


  return(
      <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#6AE056" />
      </View>
  )   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#020E12',
    width: '100%',
    height: '100%'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loading;