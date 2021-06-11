import * as React from 'react'
import {Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {ApiContext} from './context/ApiContext.js'

import AboutScreen from './screen/About'
import QuotesScreen from './screen/Quotes'
import Api from './api'

const Tab = createBottomTabNavigator()

export default function App() {
  const api = new Api()

  return (
    <ApiContext.Provider value={api}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: 'О нас',
            }}
          />
          <Tab.Screen
            name="Quotes"
            component={QuotesScreen}
            options={{
              title: 'Котировки',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApiContext.Provider>
  )
}
