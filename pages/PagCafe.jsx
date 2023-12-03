import { View, Text, Image, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { useItem } from '../src/contexts/CoffeeContext' 
import Cafe from '../src/components/Cafe';

export default function PagCafe() {
  const { selectedCoffee, addItemToCart } = useItem();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addToCart = () => {
    if (selectedCoffee) {
      addItemToCart(selectedCoffee);
      setIsAddedToCart(true);
    }
  };

  return (
    <View style={styles.background}>
      {selectedCoffee && (
        <View style={styles.item}>
          {/* Exibe as informações do item selecionado */}
          <Image source={{ uri: selectedCoffee.imgPath }} style={styles.imagem} />
          <Text style={styles.title}>{selectedCoffee.title}</Text>
          <Text style={styles.property}>{selectedCoffee.data}</Text>
          <Text style={styles.property}>{selectedCoffee.price}</Text>
          {/* Botão para adicionar ao carrinho */}
          {!isAddedToCart && <Button title="Adicionar ao Carrinho" onPress={addToCart} color={'#171C2D'} />}
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
});