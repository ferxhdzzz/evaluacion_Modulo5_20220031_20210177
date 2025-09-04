import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";

// Pantallas
import Home from "../screens/Home";
import ShowUser from "../screens/Usuario";
import AddUser from "../screens/Add";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3E92CC", // Azul claro (activo)
        tabBarInactiveTintColor: "#AAB2C8", // Gris azulado (inactivo)
        tabBarStyle: {
          backgroundColor: "#0A1F44", // Azul marino de fondo
          height: Platform.OS === "ios" ? 80 : 60,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "ShowUser":
              iconName = focused ? "people" : "people-outline";
              break;
            case "AddUser":
              iconName = focused ? "person-add" : "person-add-outline";
              break;
          }

          return <Ionicons name={iconName} color={color} size={26} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "inicio" }} />
      <Tab.Screen
        name="ShowUser"
        component={ShowUser}
        options={{ title: "registros" }}
      />
      <Tab.Screen
        name="AddUser"
        component={AddUser}
        options={{ title: "registrar" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
