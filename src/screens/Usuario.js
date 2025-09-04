import React, { useEffect, useState } from 'react';
import { 
  View,
  FlatList, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { database, auth } from '../config/firebase';
import CardUsuarios from '../components/CardUsuarios';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const UsuariosScreen = () => {
  const [usuario, setUsuario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    titulo: '',
    anioGraduacion: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
        const q = query(collection(database, 'usuarios'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUsuario({ id: querySnapshot.docs[0].id, ...userData });
            setFormData({
              nombre: userData.nombre,
              correo: userData.correo,
              titulo: userData.titulo,
              anioGraduacion: userData.anioGraduacion.toString(),
            });
          }
        } catch (error) {
          console.error('Error al obtener usuario:', error);
          Alert.alert('Error', 'No se pudo cargar la información del usuario');
        }
      }
    };

    fetchUsuario();
  }, []);

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleSave = async () => {
    const { nombre, correo, titulo, anioGraduacion } = formData;

    if (!nombre || !correo || !titulo || !anioGraduacion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(database, 'usuarios', usuario.id), {
        nombre,
        correo,
        titulo,
        anioGraduacion: parseInt(anioGraduacion, 10),
      });

      // Actualizar el estado local
      setUsuario({
        ...usuario,
        nombre,
        correo,
        titulo,
        anioGraduacion: parseInt(anioGraduacion, 10),
      });

      Alert.alert('Éxito', 'Información actualizada correctamente');
      setModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar la información');
    } finally {
      setLoading(false);
    }
  };

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
        colors={['#f3c2ea', '#b3e5fc']}
        style={styles.gradient}
      >
        <Text style={styles.title}>Mi Perfil</Text>
        
        {/* User Information Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Información Personal</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#4d82bc" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>{usuario.nombre}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#4d82bc" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Correo Electrónico</Text>
              <Text style={styles.infoValue}>{usuario.correo}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={20} color="#4d82bc" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Título Universitario</Text>
              <Text style={styles.infoValue}>{usuario.titulo}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#4d82bc" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Año de Graduación</Text>
              <Text style={styles.infoValue}>{usuario.anioGraduacion}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Editar Información</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Información</Text>

                <View style={styles.inputGroup}>
                  <Ionicons name="person-outline" size={20} color="#4d82bc" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#999"
                    value={formData.nombre}
                    onChangeText={(text) => setFormData({ ...formData, nombre: text })}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons name="mail-outline" size={20} color="#4d82bc" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#999"
                    value={formData.correo}
                    onChangeText={(text) => setFormData({ ...formData, correo: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons name="school-outline" size={20} color="#4d82bc" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Título universitario"
                    placeholderTextColor="#999"
                    value={formData.titulo}
                    onChangeText={(text) => setFormData({ ...formData, titulo: text })}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons name="calendar-outline" size={20} color="#4d82bc" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Año de graduación"
                    placeholderTextColor="#999"
                    value={formData.anioGraduacion}
                    onChangeText={(text) => setFormData({ ...formData, anioGraduacion: text })}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.saveButton, loading && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={loading}
                  >
                    <Text style={styles.buttonText}>
                      {loading ? 'Guardando...' : 'Guardar'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
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
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4d82bc',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#4d82bc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4d82bc',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4d82bc',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UsuariosScreen;
