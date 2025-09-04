import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Registro = ({ navigation }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    titulo: '',
    anioGraduacion: '',
  });

  const goToHome = () => {
    navigation.goBack();
  };

  const registrarUsuario = async () => {
    const { nombre, correo, contraseña, titulo, anioGraduacion } = usuario;

    if (!nombre || !correo || !contraseña || !titulo || !anioGraduacion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await addDoc(collection(database, 'usuarios'), {
        ...usuario,
        creado: new Date(),
      });

      Alert.alert('Registro exitoso', 'El usuario fue registrado correctamente', [
        { text: 'OK', onPress: goToHome },
      ]);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'No se pudo registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f3c2ea', '#b3e5fc']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Registro de Usuario</Text>

            <View style={styles.formContainer}>

              <View style={styles.inputGroup}>
                <Ionicons name="person-outline" size={20} color="#4d82bc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre completo"
                  placeholderTextColor="#999"
                  value={usuario.nombre}
                  onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#4d82bc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  placeholderTextColor="#999"
                  value={usuario.correo}
                  onChangeText={(text) => setUsuario({ ...usuario, correo: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#4d82bc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={usuario.contraseña}
                  onChangeText={(text) => setUsuario({ ...usuario, contraseña: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="school-outline" size={20} color="#4d82bc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Título universitario"
                  placeholderTextColor="#999"
                  value={usuario.titulo}
                  onChangeText={(text) => setUsuario({ ...usuario, titulo: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="calendar-outline" size={20} color="#4d82bc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Año de graduación"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={usuario.anioGraduacion}
                  onChangeText={(text) => setUsuario({ ...usuario, anioGraduacion: text })}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.backButton} onPress={goToHome}>
                <Text style={styles.backButtonText}>Volver</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#84b6f4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
