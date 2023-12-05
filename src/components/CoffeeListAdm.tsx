import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, FlatList, StyleSheet, TouchableHighlight, View, Text, Image, Modal, TextInput, Pressable, Button,
} from 'react-native';
import Cafe from './Cafe';
import { useNavigation } from '@react-navigation/native';
import { useItem } from '../contexts/CoffeeContext';
import axios from 'axios'

// CoffeeList recebe a lista de produtos da loja
const CoffeeListAdm = () => {
    const navigation = useNavigation();
    const { setSelectedCoffee } = useItem();
    const [refresh, setRefresh] = useState(false);

    const [coffeData, setCoffeData] = useState();
    useEffect(() => {
        fetch("https://coffee-shop-api-sigma.vercel.app/cardapio")
            .then((respFetch) => respFetch.json())
            .then((respJson) => setCoffeData(respJson))
            .catch((erro) => console.warn(erro))
    }, [refresh])

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
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                {/* <Image source={require('../assets/coffee-cup.png')} style={{ width: 50, height: 50, marginLeft: 5, marginTop: 5 }} /> */}
                <Text style={styles.title}>Coffee Shop Itabira</Text>
                <TouchableHighlight onPress={() => setPopupVisible(true)}>
                    <Image source={require('../assets/plus.png')} style={{ width: 30, height: 30, marginLeft: 5, marginTop: 5 }} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => setRefresh(refresh*-1)}>
                    <Image source={require('../assets/refresh.png')} style={{ width: 30, height: 30, marginLeft: 5, marginTop: 5 }} />
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
            {/* Produtos do Banco de Dados */}
            <FlatList
                data={coffeData}
                renderItem={({ item, separators }) => (
                    <TouchableHighlight
                        key={item.id}
                        onPress={() => {
                            setSelectedCoffee(item);
                            navigation.navigate('pagCafeAdm');
                        }}
                        style={styles.container}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight} >
                        <Cafe
                            title={item.title}
                            size={item.size}
                            data={item.data}
                            price={item.price}
                            imgpath={item.imgpath}
                        />
                    </TouchableHighlight>
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#171C2D',
        borderWidth: 5,
        borderRadius: 7,
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal:5
    },
    background: {
        backgroundColor: '#EAB56F',
        flex: 1,
    },
    header: {
        backgroundColor: '#E37239',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom:10 
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

export default CoffeeListAdm;