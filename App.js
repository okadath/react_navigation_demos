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
import { Button, View, Text,TextInput,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation, route} ) {

	  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details',
        		 {
            itemId: 86,
            otherParam: 'anything you want here',
          }
        	)}
      />

            <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Custom profile header' })
        }
      />
      <Button
        title="See counter(inter header-screen)"
        onPress={() => navigation.navigate('Counter')}
      />
       
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />

		<Button
			title="Update the title"
			onPress={() => navigation.setOptions({ title: 'Updated!' })}
		/>
		<Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {

	const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
        title="Go to Details... again"
       onPress={() => navigation.push('Details', 
       {
            itemId: Math.floor(Math.random() * 100),
          }
          )}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}


function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('da');
// asd => setPostText("sfdsa")
  return (
    <View>
      <TextInput
        // multiline
        // placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={
        	// setPostText 
        	text => setPostText(text)
        } 
         // autoFocus={false} 
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{uri:"https://img2.freepng.es/20190128/fy/kisspng-domestic-rabbit-computer-icons-scalable-vector-gra-5c4f03b504a5d6.454490481548682165019.jpg"}} 
    />
  );
}
function counter({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
}

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();


function MainStackScreen() {
  return (
      <MainStack.Navigator mode="modal"      


      >
       	<MainStack.Screen name="Home" component={HomeScreen } />
        <MainStack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }} options={{ title: 'Overview' }}/>
      	<MainStack.Screen name="CreatePost" component={CreatePostScreen} 
      	 options={{ headerTitle: 
      	 	props => <LogoTitle {...props} /> ,
      	 	headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"
            />
          ),
      	}} 
      	 />
      	 <MainStack.Screen
          name="Profile"
          component={ProfileScreen}
          //otra opcion para actualizar
          // options={({ route }) => ({ title: route.params.name })}
          options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
        />

        <MainStack.Screen
        name="Counter"
        component={counter}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle {...props} />,
        })}
      />
      </MainStack.Navigator>
   
  );
}



function App() {
  return (
  	<NavigationContainer>
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="MyModal" component={ModalScreen} />
    </RootStack.Navigator>
     </NavigationContainer>
  );
}


export default App;