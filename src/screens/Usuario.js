import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database, auth } from '../config/firebase';  // Asegúrate de importar 'auth'
import CardUsuarios from '../components/CardUsuarios';
import { LinearGradient } from 'expo-linear-gradient';

const UsuariosScreen = () => {
  const [usuario, setUsuario] = useState(null);  // Estado para almacenar el usuario logueado

  useEffect(() => {
    const fetchUsuario = async () => {
      const user = auth.currentUser;  // Obtener el usuario autenticado
      if (user) {
        // Consultar Firestore para obtener el usuario específico por su 'uid'
        const q = query(collection(database, 'usuarios'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Suponemos que solo hay un documento con el mismo UID
          const userData = querySnapshot.docs[0].data();
          setUsuario({ id: querySnapshot.docs[0].id, ...userData });
        }
      }
    };

    fetchUsuario();
  }, []);  // Se ejecuta solo una vez al cargar el componente

  // Si no hay usuario o si no se encuentra en la base de datos, mostramos un mensaje
  if (!usuario) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.title}>Usuario</Text>
        <Text>No hay usuarios registrados o no has iniciado sesión.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f3c2ea', '#b3e5fc']} // Degradado
        style={styles.gradient}
      >
        <Text style={styles.title}>Usuario</Text>
        <FlatList
          data={[usuario]}  // Pasamos solo el usuario logueado
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardUsuarios
              {...item}
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
    flex: 1,
    margin: 0,
    padding: 0,
  },
  gradient: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default UsuariosScreen;
