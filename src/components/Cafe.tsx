import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// A definição de tipo para cada propriedade dos produtos
type ItemProps = {
    title: string;
    size: string;
    data: string;
    price: string;
    imgpath: string;
};

// Item recebe as propriedades do produto
const Cafe = ({ title, size, data, price, imgpath }: ItemProps) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={{ uri: imgpath }} style={{ width: 100, height: 100 }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-around", padding: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                    <Text style={styles.cafe}>{title}</Text>
                    <Text style={styles.tamanho}>{size}</Text>
                    <Text style={styles.preco}>{price}</Text>
                </View>
                <Text style={styles.descricao}>{data}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    preco: {
        fontSize: 15,
        color: '#171C2D',
        fontWeight: '600'
    },
    cafe: {
        fontSize: 20,
        color: '#171C2D',
        fontWeight: '600',
        minWidth: 165
    },
    descricao: {
        fontSize: 14,
        color: '#171C2D',
        fontWeight: '400'
    },
    tamanho:{
        fontSize: 15,
        color: '#171C2D',
        fontWeight: '600',
        marginRight:15
    }
});

export default Cafe;
