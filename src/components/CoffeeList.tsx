import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, FlatList, StyleSheet, TouchableHighlight, Image, Text, Modal, View,
} from 'react-native';
import Cafe from './Cafe';
import { useNavigation } from '@react-navigation/native';
import { useItem } from '../contexts/CoffeeContext';

// CoffeeList recebe a lista de produtos da loja
const CoffeeList = () => {
    const navigation = useNavigation();
    const { setSelectedCoffee } = useItem();

    const [coffeData, setCoffeData] = useState();
    useEffect(() => {
        fetch("https://coffee-shop-api-sigma.vercel.app/cardapio")
            .then((respFetch) => respFetch.json())
            .then((respJson) => setCoffeData(respJson))
            .catch((erro) => console.warn(erro))
    }, [])

    return (
        <View style={styles.background}>
            {/* Produtos do Banco de Dados */}
            <FlatList
                data={coffeData}
                renderItem={({ item, separators }) => (
                    <TouchableHighlight
                        key={item.id}
                        onPress={() => {
                            setSelectedCoffee(item);
                            navigation.navigate('PaginaCafe');
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#171C2D',
        borderWidth: 5,
        borderRadius: 7,
        flexDirection: 'row',
        marginBottom: 10
    },
    background: {
        backgroundColor: '#EAB56F',
        flex: 1,
        padding: 5
    },
});

export default CoffeeList;