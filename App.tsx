import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CoffeeProvider } from './src/contexts/CoffeeContext'

import Home from './pages/Home'
import Cart from './pages/Cart'
import PagCafe from './pages/PagCafe'
import Recipe from './pages/Recipe'
import { Image, Text, View } from 'react-native'

const navBottom = createBottomTabNavigator();
const navStack = createNativeStackNavigator();

function HomeStack() {
  return (
    <navStack.Navigator screenOptions={{ headerShown: false }}>
      <navStack.Screen name="Home" component={Home} />
      <navStack.Screen name="PaginaCafe" component={PagCafe} />
    </navStack.Navigator>
  );
}

function CartStack() {
  return (
    <navStack.Navigator screenOptions={{ headerShown: false }}>
      <navStack.Screen name="Cart" component={Cart} />
      <navStack.Screen name="Recipe" component={Recipe} />
    </navStack.Navigator>
  );
}

export default function App() {
  return (
    <CoffeeProvider>    
      <NavigationContainer>
        <navBottom.Navigator screenOptions={{ headerShown: false, tabBarShowLabel:false , tabBarStyle:{
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#E37239',
          borderRadius: 15,
          height: 60,
          }}}>
          <navBottom.Screen name='Inicio' component={HomeStack} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('./src/assets/cardapio.png')}
                  resizeMode='contain'
                  style={{
                    width:20,
                    height:20,
                    tintColor: focused ? '#171C2D' : '#4F4F4F'
                  }}
                />
                <Text style={{color: focused ? '#171C2D' : '#4F4F4F', fontSize:15, fontWeight: 'bold'}}> Cardápio</Text>
              </View>
            )
          }}/>
          <navBottom.Screen name='Carrinho' component={CartStack} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('./src/assets/carrinho-de-compras.png')}
                  resizeMode='contain'
                  style={{
                    width:20,
                    height:20,
                    tintColor: focused ? '#171C2D' : '#4F4F4F'
                  }}
                />
                <Text style={{color: focused ? '#171C2D' : '#4F4F4F', fontSize:15, fontWeight: 'bold'}}> Carrrinho</Text>
              </View>
            )
          }}/>
        </navBottom.Navigator>
      </NavigationContainer>
    </CoffeeProvider>
  )
}