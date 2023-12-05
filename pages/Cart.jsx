import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useItem } from '../src/contexts/CoffeeContext';
import Cafe from '../src/components/Cafe';
import axios from 'axios'

export default function Cart() {

  const { user } = useItem();

  const { cartItems, removeItemFromCart, clearCart } = useItem();
  const navigation = useNavigation();

  const handleRemoveItem = (item) => {
    removeItemFromCart(item);
  };

  const formatPrice = (price, size) => {
    const numericPrice = parseFloat(price.replace('R$', '').replace(',', '.'));

    // Multiplica o preço pelo fator correspondente ao tamanho
    switch (size) {
      case 'P':
        return `R$ ${numericPrice.toFixed(2)}`;
      case 'M':
        return `R$ ${(numericPrice + 2).toFixed(2)}`;
      case 'G':
        return `R$ ${(numericPrice + 4).toFixed(2)}`;
      default:
        // Caso o tamanho não seja P, M ou G, retorna o preço normal
        return `R$ ${numericPrice.toFixed(2)}`;
    }
  };

  const calculateTotal = () => {
    let total = 0;

    for (const item of cartItems) {
      const price = parseFloat(item.price.replace('R$', '').replace(',', '.'));

      // Multiplica o preço pelo fator correspondente ao tamanho
      switch (item.size) {
        case 'P':
          total += price;
          break;
        case 'M':
          total += price + 2;
          break;
        case 'G':
          total += price + 4;
          break;
        default:
          // Caso o tamanho não seja P, M ou G, assume o preço normal
          total += price;
          break;
      }
    }

    return total.toFixed(2);
  };


  const confirmPurchase = async () => {
    const totalValue = calculateTotal(); // Calcula o total

    // Copia os itens do carrinho para evitar mutações indesejadas
    const itemsToPurchase = [...cartItems];
    let pedido = '';

    itemsToPurchase.forEach(element => {
      pedido += element.title + ' ' + element.size + '  -  ';
    });

    try {
      // Realiza a requisição POST para a tabela de pedidos
      await axios.post('https://coffee-shop-api-sigma.vercel.app/pedidos', { 'nomecliente': user.nome, 'nomeproduto': pedido });

      navigation.navigate('Recipe', {
        selectedItems: itemsToPurchase, // Passa a cópia dos itens do carrinho como uma propriedade
        total: totalValue, // Passa o valor do total como uma propriedade
      });

      // Limpa o carrinho
      clearCart();
    } catch {
      console.error('Erro ao enviar pedido:', error);
    }
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
              price={formatPrice(item.price, item.size)}
              imgpath={item.imgpath}
            />
            <Button title="Remover" onPress={() => handleRemoveItem(item)} color={'#171C2D'} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>
        <Button title="Confirmar Compra" onPress={confirmPurchase} color={'#171C2D'} />
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