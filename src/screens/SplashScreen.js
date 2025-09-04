import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 
const { width, height } = Dimensions.get('window');
 
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Timer para mostrar el splash screen por 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Cambiar a la pantalla de login
    }, 3000);
 
    return () => clearTimeout(timer);
  }, [navigation]);
 
  return (
    <LinearGradient
      colors={['#4d82bc', '#84b6f4', '#c4dafa', '#f3c2ea', '#f5d7ef']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Evaluación Módulo 5</Text>
        <Text style={styles.subtitle}>React Native + Firebase</Text>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <View style={styles.loadingProgress} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainer: {
    width: width * 0.6,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    // Animación simple de carga
    opacity: 0.8,
  },
});
 
export default SplashScreen;