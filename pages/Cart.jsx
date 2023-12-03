import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useItem } from '../src/contexts/CoffeeContext';
import Cafe from '../src/components/Cafe';

export default function Cart() {
  const { cartItems, removeItemFromCart } = useItem();
  const navigation = useNavigation();

  const handleRemoveItem = (item) => {
    removeItemFromCart(item);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      const price = parseFloat(item.price.replace('R$', '').replace(',', '.'));
      total += price;
    }
    return total.toFixed(2);
  };

  const clearCart = () => {
    cartItems.forEach((item) => removeItemFromCart(item));
  };


  const confirmPurchase = () => {
    const totalValue = calculateTotal(); // Calcula o total
    
    // Copia os itens do carrinho para evitar mutações indesejadas
    const itemsToPurchase = [...cartItems];
    
    navigation.navigate('Recipe', {
      selectedItems: itemsToPurchase, // Passa a cópia dos itens do carrinho como uma propriedade
      total: totalValue, // Passa o valor do total como uma propriedade
    });
  
    // Limpa o carrinho
    clearCart();
  };
      
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>Carrinho</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View>
            <Cafe
              title={item.title}
              size={item.size}
              data={item.data}
              price={item.price}
              imgPath={item.imgPath}
            />
            <Button title="Remover" onPress={() => handleRemoveItem(item)} color={'#171C2D'} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>
        <Button title="Confirmar Compra" onPress={confirmPurchase} color={'#171C2D'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#EAB56F',
    flex: 1,
    padding: 5
  },
  title: {
    marginHorizontal: 10,
    fontSize: 30,
    color: '#171C2D',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  header: {
    padding: 5,
    backgroundColor: '#E37239',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  totalContainer: {
    backgroundColor: '#EAB56F',
    padding: 10,
    marginBottom: 100,
    alignItems: 'center',
  },
  totalText: {
    color: '#171C2D',
    fontSize: 24,
    fontWeight: 'bold',
  },
})