import { View, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../src/components/Header'
import CoffeeList from '../src/components/CoffeeList'

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <CoffeeList />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})