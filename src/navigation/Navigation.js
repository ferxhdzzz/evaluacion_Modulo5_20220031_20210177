import { NavigationContainer } from "@react-navigation/native"; // Importa el contenedor de navegación
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Importa el creador de stack navigator
 
import SplashScreen from "../screens/SplashScreen.js"; // Importa la pantalla de Splash
import Login from "../screens/Login.js"; // Importa la pantalla de Login
import Home from "../screens/Home.js"; // Importa la pantalla de Sesión
import ShowUser from "../screens/Usuario.js"; // Importa la pantalla de Sesión
import AddUser from "../screens/Add.js"; // Importa la pantalla de Sesión
import TabNavigator from "../navigation/NavigationTab.js"; // Importa el navegador de pestañas
 
export default function Navigation() {
  const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" // Establece 'SplashScreen' como la ruta inicial
        screenOptions={{
          headerShown: false, // Oculta el header por defecto
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ShowUser" component={ShowUser} />
        <Stack.Screen name="AddUsers" component={AddUser} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}