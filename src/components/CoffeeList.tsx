import React from 'react';
import {
    SafeAreaView, FlatList, StyleSheet, TouchableHighlight,
} from 'react-native';
import coffeData from './produtos.json';
import Cafe from './Cafe';
import { useNavigation } from '@react-navigation/native';
import { useItem } from '../contexts/CoffeeContext';

// CoffeeList recebe a lista de produtos da loja
const CoffeeList = () => {
    const navigation = useNavigation(); 
    const { setSelectedCoffee } = useItem();

    return (      
        <SafeAreaView style={styles.background}>           
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
                        style = { styles.container }
                        onShowUnderlay = { separators.highlight}
                        onHideUnderlay = { separators.unhighlight } >
                        <Cafe 
                            title={item.title}
                            size={item.size}
                            data={item.data}
                            price={item.price}
                            imgPath={item.imgPath}
                        />
                    </TouchableHighlight>
                )}
            keyExtractor = { item => item.id }
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
        marginBottom: 10
    },
    background: {
        backgroundColor: '#EAB56F',
        flex: 1,
        padding: 5
    },
});

export default CoffeeList;