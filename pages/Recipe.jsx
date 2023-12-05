import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Recipe({ route }) {
  const { selectedItems, total } = route.params;

    // Função para calcular o preço com base no tamanho
    const calculatePriceBySize = (price, size) => {
      const numericPrice = parseFloat(price.replace('R$', '').replace(',', '.'));
  
      switch (size) {
        case 'P':
          return numericPrice.toFixed(2);
        case 'M':
          return (numericPrice + 2).toFixed(2);
        case 'G':
          return (numericPrice + 4).toFixed(2);
        default:
          return numericPrice.toFixed(2);
      }
    }

  return (
    <View style={styles.container}>
      <Text>Itens selecionados:</Text>
      <FlatList
        data={selectedItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.size}</Text>
            <Text>{calculatePriceBySize(item.price, item.size)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>Total: R$ </Text>
      <Text>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 100,
},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
});
