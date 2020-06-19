# React Navigation examples


React internamente no maneja solo los cambios entre elementos, para web esta react-router y para app esta react-navigation

https://reactnavigation.org/docs/getting-started

usar la documentacion para lo basico

si hay errores de dependencias usar la version de compatibilidad

https://reactnavigation.org/docs/compatibility/

el demo de nativebase esta deprecado por lo mismo, entonces primero estudiare el navigation (a la mierda platzi por el maestro inutil y posibles cambios)
este es el tuto a mano y a partir de ahi lo modificare para el proyecto

ejecutar proyecto en expo

```sh
yarn expo init demo

yarn add expo
yarn expo init demo
cd demo/
yarn expo start
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
yarn expo start
yarn add react-navigation native-base
yarn react-native link
yarn expo start

# esta fue la primera isntalacion que hice

yarn add  react-navigation-tabs react-native-reanimated react-native-gesture-handler react-native-screens
yarn react-native link react-native-gesture-handler
yarn react-native link react-native-reanimated
yarn react-native link react-navigation-tabs
yarn expo start

# esta con expo funciono al 100%
yarn expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
yarn expo start
yarn add @react-navigation/native @react-navigation/compat @react-navigation/stack
yarn expo start
```

## basico:

crear los componentes de las vistas y estos seran apilados en el stack
el navigationcontainer necesita una vista para mostrar, al al parecer literalmente es un stack
```jsx

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
```


en react usariamos algo asi para navegar entre vistas web:

```js
<a href="details.html">Go to Details</a>

...

<a onClick={() => {
    window.location.href = 'details.html';
  }}>
  Go to Details
</a>
```

para que haya capacidad de navegar hay que reescribir el componente:

```jsx
function HomeScreen({ navigation} ) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
```
y ya navega entre paginas :O

si nos referimos a la misma pagina a s misma con un boton no te lleva a ella, hay que pushearla
```jsx
//sin push, se queda en si misma
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
            <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
```

```jsx
//pusheando, works, crea multiples "ventanas" de la misma pagina
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
            <Button
        title="Go to Details... again"
       onPress={() => navigation.push('Details')}
      />
    </View>
  );
}
```

se pueden lanzar multiples comportamientos(si no se ha navegado a ninguna otra pagina y tratas de acceder a ellas desdde el stack lanza errores por que esta vacio, esto lo previene el programador):


```jsx
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
            <Button
        title="Go to Details... again"
       onPress={() => navigation.push('Details')}
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
```


## paso de valores entre vistas
hay que usar context, no funciones:
```jsx
//NO!!
component={() => <HomeScreen />}

//SI!
<Stack.Screen name="Home">
  {props => <HomeScreen {...props} extraData={someData} />}
</Stack.Screen>

//inicializacion de aprametros tambien funciona en componentes
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```


para el paso de parametros anidados hay que indicar la vista al parecer :v:
```
navigation.navigate('Account', {
  screen: 'Settings',
  params: { user: 'jane' },
});
```

para almacenar esos datos reescribimos la funcion home:
```jsx
function HomeScreen({ navigation, route} ) {
	//almacena los datos
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
        //pasa los datos como json a las vistas
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
      //imprime datos
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}
```

tambien reescribimos la funcion de details para permitir el paso de aprametros entre vistas
```jsx
function DetailsScreen({ route, navigation }) {
//lee datos
const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      		//imprime datos
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

```

y creamos una vista para ejemplificar el paso hacia atras de informacion a las vistas :

```jsx
function CreatePostScreen({ navigation, route }) {
	//inicializamos
  const [postText, setPostText] = React.useState('da');
// asd => setPostText("sfdsa")
  return (
    <View>
      <TextInput
      //propiedades de texinput
        // multiline
        // placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={
        	//este era el original
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
```

y lo apilamos en el navigation del main :
```jsx
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
      	...
      	<Stack.Screen name="CreatePost" component={CreatePostScreen} />
		...
```




