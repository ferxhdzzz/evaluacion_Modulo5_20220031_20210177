import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { database } from '../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const CardUsuarios = ({ id, nombre, correo, titulo, anioGraduacion, onUserDeleted, onUserUpdated }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ nombre, correo, titulo, anioGraduacion: anioGraduacion.toString() });

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(database, 'usuarios', id));
      Alert.alert('Usuario eliminado', 'El usuario fue eliminado correctamente');
      onUserDeleted(id);
    } catch (e) {
      console.error('Error al eliminar usuario: ', e);
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    }
  };

  const handleSave = async () => {
    const { nombre, correo, titulo, anioGraduacion } = formData;

    if (!nombre || !correo || !titulo || !anioGraduacion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      await updateDoc(doc(database, 'usuarios', id), {
        nombre,
        correo,
        titulo,
        anioGraduacion: parseInt(anioGraduacion, 10),
      });
      Alert.alert('Usuario actualizado', 'Los datos fueron guardados correctamente');
      onUserUpdated(id, formData);
      setModalVisible(false);
    } catch (e) {
      console.error('Error al actualizar usuario: ', e);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.text}>Correo: {correo}</Text>
      <Text style={styles.text}>Título: {titulo}</Text>
      <Text style={styles.text}>Año de Graduación: {anioGraduacion}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar usuario */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={text => setFormData({ ...formData, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={formData.correo}
              onChangeText={text => setFormData({ ...formData, correo: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Título Universitario"
              value={formData.titulo}
              onChangeText={text => setFormData({ ...formData, titulo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Año de Graduación"
              value={formData.anioGraduacion}
              onChangeText={text => setFormData({ ...formData, anioGraduacion: text })}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', // Rosa pastel claro
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#7a8caf', // Azul pastel sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4a4a8a', // Azul oscuro
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: '#7a6f8a', // Gris rosado suave
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#7a8caf', // Azul pastel
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f48fb1', // Rosa pastel
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#7a8caf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#4a4a8a',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#7a8caf',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#4a4a8a',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#7a8caf',
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: '#f48fb1',
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export default CardUsuarios;
