import { View, Text, Image, StyleSheet, Button, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useItem } from '../src/contexts/CoffeeContext'
import Cafe from '../src/components/Cafe';

export default function PagCafe() {
  const { selectedCoffee, addItemToCart } = useItem();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isPopupVisible, setIspopUPVisible] = useState(false);

  const addToCart = (size) => {
    if (selectedCoffee) {
      // Crie um novo objeto com todas as propriedades do café selecionado
      const coffeeWithSize = {
        ...selectedCoffee,
        size: size,
      };
  
      // Adicione o café com o tamanho ao carrinho
      addItemToCart(coffeeWithSize);
  
      // Defina o estado para exibir a mensagem de sucesso, se necessário
      setIsAddedToCart(true);
    }
  };
  
  return (
    <View style={styles.background}>
      {selectedCoffee && (
        <View style={styles.item}>
          {/* Exibe as informações do item selecionado */}
          <Image source={{ uri: selectedCoffee.imgpath }} style={styles.imagem} />
          <Text style={styles.title}>{selectedCoffee.title}</Text>
          <Text style={styles.property}>{selectedCoffee.data}</Text>
          {/*<Text style={styles.property}>{selectedCoffee.price}</Text>*/}
          {/* Botão para adicionar ao carrinho */}
          {/*!isAddedToCart && <Button title="Adicionar ao Carrinho" onPress={addToCart} color={'#171C2D'} />*/}
          <View style={styles.containerbotoes}>
            <View style={styles.precos}>
            <Text>Pequeno</Text>
              <Text>R$ {selectedCoffee.price}</Text>
              <TouchableOpacity style={styles.button} onPress={()=>addToCart('P')}>
                <Image source={require('../src/assets/plus.png')} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.precos}>
            <Text>Médio</Text>
              <Text>R$ {parseFloat(selectedCoffee.price) + 2},00</Text>
              <TouchableOpacity style={styles.button} onPress={()=>addToCart('M')}>
                <Image source={require('../src/assets/plus.png')} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.precos}>
              <Text>Grande</Text>
              <Text>R$ {parseFloat(selectedCoffee.price) + 4},00</Text>
              <TouchableOpacity style={styles.button} onPress={()=>addToCart('G')}>
                <Image source={require('../src/assets/plus.png')} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </View>
          </View>
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
  button: {
    flex: 1,
    paddingBottom: 50,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    zIndex: 2
  },
  containerbotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});