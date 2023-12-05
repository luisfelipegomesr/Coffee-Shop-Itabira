import { View, Text, Image, StyleSheet, Button, TextInput, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useItem } from '../src/contexts/CoffeeContext'
import Cafe from '../src/components/Cafe';
import axios from 'axios';

export default function PagCafeAdm() {
    const { selectedCoffee, addItemToCart } = useItem();
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isDelPopupVisible, setIsDelPopupVisible] = useState(false);

    const [editedTitle, setEditedTitle] = useState(selectedCoffee?.title);
    const [editedData, setEditedData] = useState(selectedCoffee?.data);
    const [editedPrice, setEditedPrice] = useState(selectedCoffee?.price);

    const editar = () => {
        if (selectedCoffee) {

            const updatedCoffee = {
                ...selectedCoffee,
                title: editedTitle,
                data: editedData,
                price: editedPrice,
            };

            axios.put(`https://coffee-shop-api-sigma.vercel.app/cardapio/${selectedCoffee.id}`, updatedCoffee)
                .then(response => {
                    console.log('sucesso verde:', response.data);
                })
                .catch(error => {
                    console.log('Erro ao editar o item:', error);
                });

            setPopupVisible(false);
        }
    };

    const excluir = () => {
        if (selectedCoffee) {
            axios.delete(`https://coffee-shop-api-sigma.vercel.app/cardapio/${selectedCoffee.id}`)
            setIsDelPopupVisible(false)
        }
    }

    return (
        <View style={styles.background}>
            {selectedCoffee && (
                <View style={styles.item}>
                    {/* Exibe as informações do item selecionado */}
                    <Image source={{ uri: selectedCoffee.imgpath }} style={styles.imagem} />
                    <Text style={styles.title}>{selectedCoffee.title}</Text>
                    <Text style={styles.property}>{selectedCoffee.data}</Text>
                    <Text style={styles.property}>{selectedCoffee.price}</Text>
                    {/* Botão para editar */}
                    <Button title="Editar" onPress={() => setPopupVisible(true)} color={'#171C2D'} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isPopupVisible}
                        onRequestClose={() => setPopupVisible(!isPopupVisible)}
                    >
                        <View style={styles.popup}>
                            <TextInput
                                style={styles.input}
                                value={editedTitle}
                                onChangeText={text => setEditedTitle(text)}
                                placeholder="Title"
                            />
                            <TextInput
                                style={styles.input}
                                value={editedData}
                                onChangeText={text => setEditedData(text)}
                                placeholder="Data"
                            />
                            <TextInput
                                style={styles.input}
                                value={editedPrice}
                                onChangeText={text => setEditedPrice(text)}
                                placeholder="Price"
                            />
                            <Button title='Confirmar' onPress={editar} color={'#171C2D'} />
                            <Pressable onPress={() => setPopupVisible(false)}>
                                <Text style={styles.closeButton}>Fechar</Text>
                            </Pressable>
                        </View>
                    </Modal>
                    <Button title='Excluir' onPress={() => setIsDelPopupVisible(true)} color={'#171C2D'}/>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isDelPopupVisible}
                        onRequestClose={() => setIsDelPopupVisible(!isDelPopupVisible)}
                    >
                        <View style={styles.popup}>
                        <Text style={styles.textim}>Tem certeza que deseja excluir o item?</Text>
                            <Button title='Confirmar' onPress={excluir} color={'#171C2D'} />
                            <Pressable onPress={() => setIsDelPopupVisible(false)}>
                                <Text style={styles.closeButton}>Fechar</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        padding: 10,
        borderWidth: 5,
        borderRadius: 7,
        borderStyle: 'solid',
    },
    title: {
        marginHorizontal: 10,
        fontSize: 52,
        color: '#171C2D',
        fontWeight: 'bold',
        fontFamily: 'Helvetica',
    },
    property: {
        fontSize: 28,
        marginHorizontal: 16,
    },
    imagem: {
        width: 360,
        height: 300,
    },
    background: {
        backgroundColor: '#EAB56F',
        flex: 1,
        padding: 5
    },
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAB56F',
        borderWidth: 5,
        borderRadius: 7,
        borderStyle: 'solid',
        margin: 50,

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        width: 200,
    },
    closeButton: {
        color: '#fff',
        marginTop: 10,
    },
    textim:{
        color: '#171C2D',
        fontSize:15,
        marginBottom: 20
    },
});