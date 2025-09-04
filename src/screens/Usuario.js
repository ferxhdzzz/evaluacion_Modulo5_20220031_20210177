import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';
import CardUsuarios from '../components/CardUsuarios';
import { LinearGradient } from 'expo-linear-gradient';

const UsuariosScreen = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const querySnapshot = await getDocs(collection(database, 'usuarios'));
      const usersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsuarios(usersArray);
    };

    fetchUsuarios();
  }, []);

  const handleUserDeleted = (id) => {
    setUsuarios(usuarios.filter(user => user.id !== id));
  };

  const handleUserUpdated = (id, newData) => {
    setUsuarios(usuarios.map(user => (user.id === id ? { id, ...newData } : user)));
  };

  if (usuarios.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.title}>Usuarios</Text>
        <Text>No hay usuarios registrados aún.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f3c2ea', '#b3e5fc']} // Degradado
        style={styles.gradient}
      >
        <Text style={styles.title}>Usuarios</Text>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardUsuarios
              {...item}
              onUserDeleted={handleUserDeleted}
              onUserUpdated={handleUserUpdated}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Asegura que el contenedor ocupe todo el espacio
    margin: 0,  // Elimina cualquier margen predeterminado
    padding: 0, // Elimina el padding para evitar espacios blancos
  },
  gradient: {
    flex: 1,  // Hace que el gradiente ocupe todo el espacio
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0, // Elimina cualquier padding adicional
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Título en color negro
    marginVertical: 16,
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default UsuariosScreen;
