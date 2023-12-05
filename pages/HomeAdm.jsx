import { View, StyleSheet } from 'react-native'
import React from 'react'
import CoffeeListAdm from '../src/components/CoffeeListAdm'
import HeaderAdm from '../src/components/HeaderAdm'

export default function HomeAdm() {
  return (
    <View style={styles.container}>
      <CoffeeListAdm />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})