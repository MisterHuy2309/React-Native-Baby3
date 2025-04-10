import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const response = await axios.get('http://192.168.1.50:5040/Items');
            console.log('Loaded items:', response.data); // Debug log
            setItems(response.data);
        } catch (error) {
            Alert.alert('Error', 'Could not load items');
            console.error(error);
        }
    };

    const addItem = async () => {
        if (!name || !description) {
            Alert.alert('Error', 'Please enter both name and description');
            return;
        }

        try {
            const newItem = { name, description };
            await axios.post('http://192.168.1.50:5040/Items', newItem);
            Alert.alert('Notice', 'Item added successfully');
            loadItems();
            resetForm();
        } catch (error) {
            Alert.alert('Error', 'Could not add item');
            console.error(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://192.168.1.50:5040/Items/${id}`);
            Alert.alert('Notice', 'Item deleted successfully');
            loadItems();
        } catch (error) {
            Alert.alert('Error', 'Could not delete item');
            console.error(error);
        }
    };
    const confirmDelete = (id) => {
        Alert.alert('Xác nhận xóa', 'Bạn có chắc muốn xóa mục này?', [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Xóa', style: 'destructive', onPress: () => deleteItem(id) },
        ]);
      };
      const ButtonCustom = ({ title, onPress, backgroundColor }) => (
        <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      );
      <ButtonCustom
      title={editingId ? "Cập nhật Mục" : "Thêm Mới"}
      onPress={editingId ? updateItem : addItem}
      backgroundColor={editingId ? '#8080FF' : '#28A745'}  // Thêm màu khác cho nút
    />
    
      

    const startEditing = (item) => {
        setEditingId(item.id || item._id);
        setName(item.name);
        setDescription(item.description);
    };

    const updateItem = async () => {
        if (!name || !description) {
            Alert.alert('Error', 'Please enter both name and description');
            return;
        }

        try {
            const updatedItem = { name, description };
            await axios.put(`http://192.168.1.50:5040/Items/${editingId}`, updatedItem);
            Alert.alert('Notice', 'Item updated successfully');
            loadItems();
            resetForm();
        } catch (error) {
            Alert.alert('Error', 'Could not update item');
            console.error(error);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setEditingId(null);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}: {item.description}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                    <Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id || item._id)}>
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item List</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            {editingId ? (
                <Button
                    title="Update Item"
                    onPress={updateItem}
                    color="#999BFF"
                />
            ) : (
                <Button
                    title="Add Item"
                    onPress={addItem}
                    color="#28A745"
                />
            )}
            <FlatList
                data={items}
                keyExtractor={(item) => (item.id || item._id).toString()}
                renderItem={renderItem}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'linear-gradient(45deg, #FFB6C1, #FFC0CB)',  // Gradient nền
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#343a40',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 45,
      borderColor: '#cddddd',
      borderWidth: 1,
      marginBottom: 15,
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#ffffff',
      fontSize: 16,
    },
    itemContainer: {
      marginBottom: 15,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowColor: '#ddd',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemText: {
      fontSize: 16,
      color: '#495057',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    editButton: {
      backgroundColor: '#8097FF',
      padding: 12,
      borderRadius: 5,
      flex: 1,
      marginRight: 5,
    },
    deleteButton: {
      backgroundColor: '#FF4F5B',
      padding: 12,
      borderRadius: 5,
      flex: 1,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  
  export default ItemList;
  
