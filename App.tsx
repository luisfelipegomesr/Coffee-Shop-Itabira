import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CoffeeProvider } from './src/contexts/CoffeeContext'
import { LogBox } from 'react-native'

import HomeAdm from './pages/HomeAdm'
import Home from './pages/Home'
import Users from './pages/Users'
import Cart from './pages/Cart'
import PagCafe from './pages/PagCafe'
import Recipe from './pages/Recipe'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import pagCafeAdm from './pages/pagCafeAdm'
import Pedidos from './pages/Pedidos'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator();
const navBottom = createBottomTabNavigator();



function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PaginaCafe" component={PagCafe} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}

function AdmHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeAdm' component={HomeAdm} />
      <Stack.Screen name='pagCafeAdm' component={pagCafeAdm} />
    </Stack.Navigator>
  )
}

function PedidosFeitos() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Pedidos' component={Pedidos} />
    </Stack.Navigator>
  )
}

function Autenticacao() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Autenticacao' component={Users} />
      <Stack.Screen name='RodapeAdm' component={RodapeAdm} />
      <Stack.Screen name='RodapeCliente' component={RodapeCliente} />
    </Stack.Navigator>
  )
}

function RodapeAdm() {
  return (
    <navBottom.Navigator screenOptions={{
      headerShown: false, tabBarShowLabel: false, tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#E37239',
        borderRadius: 15,
        height: 60,
      }
    }}>
      <navBottom.Screen name='InicioAdm' component={AdmHomeStack} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('./src/assets/cardapio.png')}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#171C2D' : '#4F4F4F'
              }}
            />
            <Text style={{ color: focused ? '#171C2D' : '#4F4F4F', fontSize: 15, fontWeight: 'bold' }}> Cardápio</Text>
          </View>
        )
      }} />
      <navBottom.Screen name='PedidosFeitos' component={PedidosFeitos} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('./src/assets/cardapio.png')}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#171C2D' : '#4F4F4F'
              }}
            />
            <Text style={{ color: focused ? '#171C2D' : '#4F4F4F', fontSize: 15, fontWeight: 'bold' }}> Pedidos </Text>
          </View>
        )
      }} />
    </navBottom.Navigator>
  )
}

function RodapeCliente() {
  return (
    <navBottom.Navigator screenOptions={{
      headerShown: false, tabBarShowLabel: false, tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#E37239',
        borderRadius: 15,
        height: 60,
      }
    }}>
      <navBottom.Screen name='Inicio' component={HomeStack} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('./src/assets/cardapio.png')}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#171C2D' : '#4F4F4F'
              }}
            />
            <Text style={{ color: focused ? '#171C2D' : '#4F4F4F', fontSize: 15, fontWeight: 'bold' }}> Cardápio</Text>
          </View>
        )
      }} />
      <navBottom.Screen name='Carrinho' component={CartStack} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('./src/assets/carrinho-de-compras.png')}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#171C2D' : '#4F4F4F'
              }}
            />
            <Text style={{ color: focused ? '#171C2D' : '#4F4F4F', fontSize: 15, fontWeight: 'bold' }}> Carrinho</Text>
          </View>
        )
      }} />
    </navBottom.Navigator>
  )
}

export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <NavigationContainer>
      <CoffeeProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Autenticacao1' component={Autenticacao} />
        </Stack.Navigator>
      </CoffeeProvider>
    </NavigationContainer>
  )
}