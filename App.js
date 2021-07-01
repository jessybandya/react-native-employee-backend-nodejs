import { StatusBar } from 'expo-status-bar';
import React,{createContext,useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import  Home from './screens/Home'
import  CreateEmployee from './screens/CreateEmployee'
import  Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import {createStore} from "redux"
import {Provider} from "react-redux"
import {reducer,initState} from './reducers/reducer'

// const store = createStore(reducer)
export const MyContext = createContext()



const Stack = createStackNavigator();

const myOptions ={
  title:"Home",
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#006aff"
  }
}
function App() {
  return (
    <View style={styles.container}>
     <Stack.Navigator>
       <Stack.Screen 
       name="Home" 
       component={Home} 
       options={myOptions}
       />
       <Stack.Screen
        name="Profile" 
        component={Profile} 
        options={{...myOptions,title:"Profile"}}
        />
       <Stack.Screen 
       name="Add" 
       component={CreateEmployee} 
       options={{...myOptions,title:"Add Employee"}}

       />

     </Stack.Navigator>
    </View>
  );
}

export default ()=>{
 const [state,dispatch]= useReducer(reducer,initState)


  return(
    <MyContext.Provider value={
      {state,dispatch}
    }>
    <NavigationContainer>
      <App />
    </NavigationContainer>
    </MyContext.Provider>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    // marginTop:Constants.statusBarHeight,
  },
});
