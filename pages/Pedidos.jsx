import { View, Text, StyleSheet, FlatList, Modal, Button, Pressable, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Pedidos() {

    const [refresh, setRefresh] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        fetch("https://coffee-shop-api-sigma.vercel.app/pedidos")
            .then((respFetch) => respFetch.json())
            .then((respJson) => setPedidos(respJson))
            .catch((erro) => console.warn(erro))
    }, [refresh])

    const excluir = () => {
        if (selectedPedido) {
            axios.delete(`https://coffee-shop-api-sigma.vercel.app/pedidos/${selectedPedido.pedidoid}`);
            setIsPopupVisible(false);
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                {/* <Image source={require('../assets/coffee-cup.png')} style={{ width: 50, height: 50, marginLeft: 5, marginTop: 5 }} /> */}
                <Text style={styles.title}>Coffee Shop Itabira</Text>
                <TouchableHighlight onPress={() => setRefresh(refresh*-1)}>
                    <Image source={require('../src/assets/refresh.png')} style={{ width: 30, height: 30, marginLeft: 5, marginTop: 5 }} />
                </TouchableHighlight>
            </View>
            {/* Pedidos do Banco de Dados */}
            <FlatList
                data={pedidos}
                renderItem={({ item, separators }) => (
                    <TouchableHighlight
                        key={item.PedidoID}
                        onPress={() => { setIsPopupVisible(true); setSelectedPedido(item) }}
                        style={styles.container}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight} >
                        <View>
                            <Text style={{ fontSize: 20 }}>Pedido: {item.nomeproduto}</Text>
                            <Text style={{ fontSize: 20 }}>Cliente: {item.nomecliente}</Text>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={item => item.pedidoid}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={() => setIsPopupVisible(!isPopupVisible)}
            >

                <View style={styles.popup}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Deseja encerrar o pedido?</Text>
                    <Button title='Confirmar' onPress={excluir} color={'#171C2D'} />
                    <Pressable onPress={() => setIsPopupVisible(false)}>
                        <Text style={styles.closeButton}>Fechar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#171C2D',
        borderWidth: 5,
        borderRadius: 7,
        flexDirection: 'row',
        margin: 10
    },
    background: {
        backgroundColor: '#EAB56F',
        flex: 1,
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
        marginVertical: 180

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
});
