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
yarn add react-native react-navigation native-base
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


### paso de valores entre vistas
hay que usar context, no funciones:
```js
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


para el paso de parametros anidados hay que indicar la vista al parecer :v :
```js
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

### estilos
para cammbiar el nombre de una pagina 
```js

function HomeScreen({ navigation, route} ) {
...
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Custom profile header' })
        }
      />
...
```

 y en el stack agregamos un router de su vista

```js
 <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}

        />
```
tambien se puede activar solo, editandolo desde el componente:

```jsx
function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />

    <Button
      title="Update the title"
      onPress={() => navigation.setOptions({ title: 'Updated!' })}
    />
    </View>
  );
}
```





para editar los estilos de los headers agregamos a su info en el stack (una sola vista):
```jsx
<Stack.Screen
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
```

para muchas vistas hacer la edicion de estilos en el navigator:

```jsx
 <Stack.Navigator mode="modal"      
       screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}

      >
```



para colocar un icono agregamos al stack

```jsx

<Stack.Screen name="CreatePost" component={CreatePostScreen} 
         options={{ headerTitle: props => <LogoTitle {...props} /> }} 
         />
```
y agregamos una funcion para devolver un componente imagen(trabaja facil con web, dificil con statics):
```jsx
import { Button, View, Text,TextInput,Image } from 'react-native';
...
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{uri:"https://img2.freepng.es/20190128/fy/kisspng-domestic-rabbit-computer-icons-scalable-vector-gra-5c4f03b504a5d6.454490481548682165019.jpg"}} 
    />
  );
}
```

### interaccion entre headers y screens
creamos un componente de vista que manejara la programacion de la interaccion:
```jsx
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

```

y lo llamamos desde un boton:
```js
<Button title="See counter(inter header-screen)"
        onPress={() => navigation.navigate('Counter')}
      />
```

hay que apilarlo en el stack y pasarle el router o si no no podra acceder a los datos:

```js
...
<Stack.Screen
        name="Counter"
        component={counter}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle {...props} />,
        })}
      />
```
### modal
requiere stacks anidados

es posible llamarlo desde cualquier vista
```js
<Button onPress={() => navigation.navigate('MyModal')} 
  title="Open Modal"
      />
```

la vista modal es igual que cualquier vista normal:
```jsx
function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
```
ademas de esa screen debemos reescribir nuestra screen principal donde esta el stack para que apile un nuevo stack con el stack principal y el modal

```jsx
//crear dos stacks
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

//era el antiguo app
function MainStackScreen() {
  return (
    //lo instanciamos del creado arriba y todo es como el original en app
        //son exactamente las mismas vistas principales 
    //como si solo hubiera un stack
      <MainStack.Navigator mode="modal" >

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
  //este es el nuevo stack anidado que posee el principal y el modal y indica las vistas a usar, ademas de manejar el 
  //navigation container que es el manejador principal de vistas
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
```


al parecer hay problemas con el componente toast para el despliegue de errores ya que se basa en stack navigation pero ha cambiado mucho la sintaxis de estos, entonces habra que esperar a que lo arreglen o actualicen para hallar la solucion

para react usare este 
``` 
yarn start react-native-simple-toast

import Toast from 'react-native-simple-toast';
 
Toast.show('This is a toast.');
Toast.show('This is a long toast.', Toast.LONG);
 
Toast.showWithGravity('This is a long toast at the top.', Toast.LONG, Toast.TOP);
 
Toast.show('This is nicely visible even if you call this when an Alert is shown', Toast.SHORT, [
  'UIAlertController',
]);
```

y solo hay que llamarlo en alguna accion:
```
<Button
        onPress={() => Toast.show('This is a toast.')}
        title="Toasr"
      />
```

## web build production
para exportar un proyecto de expo a web basta con usar `expo build:web` y esos archivos se podran servir desde cualquier webserver (funciono el de django `python3 -m http.server 8000`)


