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