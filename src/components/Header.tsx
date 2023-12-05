import { View, Text, StyleSheet, StatusBar, Image, TouchableHighlight } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/coffee-cup.png')} style={{ width: 50, height: 50, marginLeft: 5, marginTop: 5 }} /> 
      <Text style={styles.title}>Coffee Shop Itabira</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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