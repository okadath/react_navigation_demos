// // import React, { Component } from "react";
// import Expo from "expo";
// // import HomeScreen from "./HomeScreen/index.js";
// import 'react-native-gesture-handler';


// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Text } from 'native-base';
// export default function App() {
//   return (
//     <NavigationContainer>{

//        <Text>Footer</Text>
//     }</NavigationContainer>
//   );
// }

// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screenn</Text>
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Home ddemo" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;