import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Recipe({ route }) {
  const { selectedItems, total } = route.params;

  return (
    <View style={styles.container}>
      <Text>Itens selecionados:</Text>
      <FlatList
        data={selectedItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
});
