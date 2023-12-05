import { View, Text, StyleSheet, StatusBar, Image, TouchableHighlight, Modal, Pressable, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

export default function HeaderAdm() {

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');
    const [price, setPrice] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [size, setSize] = useState('');

    const cadastrar = () => {
        axios.post('https://coffee-shop-api-sigma.vercel.app/cardapio', {'title':title, 'size':size,'data':data,'price':price,'imgpath':imgPath})
        setPopupVisible(false);
    }

    return (
        <View style={styles.header}>
            {/* <Image source={require('../assets/coffee-cup.png')} style={{ width: 50, height: 50, marginLeft: 5, marginTop: 5 }} /> */}
            <Text style={styles.title}>Coffee Shop Itabira</Text>
            <TouchableHighlight onPress={() => setPopupVisible(true)}>
                <Image source={require('../assets/plus.png')} style={{ width: 30, height: 30, marginLeft: 5, marginTop: 5 }} />
            </TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={() => setPopupVisible(!isPopupVisible)}
            >
                <View style={styles.popup}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTitle(text)}
                        placeholder="Nome"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setSize(text)}
                        placeholder="Tamanhos"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setData(text)}
                        placeholder="Descriçao"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPrice(text)}
                        placeholder="Preço"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setImgPath(text)}
                        placeholder="URL da Imagem"
                    />
                    <Button title='Cadastrar' onPress={cadastrar} color={'#171C2D'} />

                    <Pressable onPress={() => setPopupVisible(false)}>
                        <Text style={styles.closeButton}>Fechar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 5,
        backgroundColor: '#E37239',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 30,
        color: '#171C2D',
        fontWeight: 'bold',
        fontFamily: 'Helvetica',
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
});