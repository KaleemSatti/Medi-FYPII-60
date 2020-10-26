import React,{useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Octicons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/redux/store';
import theme from './themes';
import firebaseApp from './firebase';
import HomeScreen from './src/screens/Home';
import RequestScreen from './src/screens/Request';
import DriverSignUp from './src/screens/DriverSignUp';
import SelectImages from './src/components/SelectImages';
import SignUp from './src/screens/SignUp';

import produce from 'immer';
import LogIn from './src/screens/LogIn';
const BottomNavigation = createBottomTabNavigator();
const DrawerNavigation = createDrawerNavigator();
const HomeStack = createStackNavigator();
const RequestStack = createStackNavigator();
const AuthStack = createStackNavigator();

function CommonStackOptions(props){
  return {
    headerTitle:"",
    headerStyle:{
      height:70,
    },
    headerTransparent:true,
    headerBackImage:(()=>(
      <MaterialCommunityIcons name="menu-open" color={theme.tabBar} size={25}/>
    )),
    headerLeft:(()=>(
      <TouchableOpacity style={{marginLeft:5}} onPress={()=>{
        const Drawer = props.navigation.dangerouslyGetParent();
        Drawer.toggleDrawer();
      }}>
        <MaterialCommunityIcons name="menu-open" color={theme.tabBar} size={40}/>
      </TouchableOpacity>
    )),
    headerRight:(()=>(
      <View style={{marginRight:5}}>
        <MaterialIcons name="person-pin" color={theme.tabBar} size={40}/>
      </View>
    ))
  }
}

const _HomeStack = (props) => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={CommonStackOptions(props)}/>
      <HomeStack.Screen name="DriverSignUp" component={DriverSignUp} options={CommonStackOptions(props)}/>
      <HomeStack.Screen name="SelectImages" component={SelectImages} options={CommonStackOptions(props)}/>
    </HomeStack.Navigator>
  );
}

const _RequestStack = (props) => {
  return(
    <RequestStack.Navigator>
      <RequestStack.Screen name="Request" component={RequestScreen} options={CommonStackOptions(props)}/>
    </RequestStack.Navigator>
  )
}

const _BottomTabs = (props) => {
  return(
    <BottomNavigation.Navigator tabBarOptions={{
      activeTintColor:theme.secondary,
      inactiveTintColor:theme.white,
      labelStyle:{
        fontSize:12,
        fontWeight:'bold'
      },
      style:{
        borderTopLeftRadius:90,
        borderTopRightRadius:90,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderBottomEndRadius:10,
        marginBottom:1,
        backgroundColor:theme.tabBar
      },
      labelPosition:'below-icon',
      showLabel:false,
      keyboardHidesTabBar:true
    }}
    >
      <BottomNavigation.Screen name="TabMain" component={_HomeStack} options={{
        tabBarLabel:"HOME",
        tabBarIcon:({color})=>(
          <MaterialCommunityIcons name="home" color={color} size={20}/>
        )
      }}
      />
      <BottomNavigation.Screen name="TabAmulance" component={_RequestStack} options={{
        tabBarLabel:"HOME",
        tabBarIcon:({color})=>(
          <View style={{padding:3}}>
            <Octicons name="issue-opened" color={color} size={30}/>
          </View>
        )
      }}
      />
      <BottomNavigation.Screen name="TabNotifications" component={_HomeStack} options={{
        tabBarLabel:"HOME",
        tabBarIcon:({color})=>(
          <View style={{padding:3}}>
            <MaterialCommunityIcons name="bell" color={color} size={20}/>
          </View>
        )
      }}
      />
      <BottomNavigation.Screen name="TabCalender" component={_HomeStack} options={{
        tabBarLabel:"HOME",
        tabBarIcon:({color})=>(
          <View style={{padding:3}}>
            <Fontisto name="date" color={color} size={20}/>
          </View>
        )
      }}
      />
    </BottomNavigation.Navigator>
  );
}

const MainDrawer = (props) => {
  return(
    <DrawerNavigation.Navigator>
      <DrawerNavigation.Screen name="HOME" component={_BottomTabs}/>
    </DrawerNavigation.Navigator>    
  );
}
const App = () => {
  firebaseApp.initalize();

  useEffect(() => {
    async function checkDriver(){
      try{
        const value = await AsyncStorage.getItem('@driver');
        if(value!==null){
          if(value.driver){
             // Update lat long
            navigator.geolocation.getCurrentPosition(({coords})=>{
              console.log(coords);
            });
          }
        }
      }
      catch(e){
        console.log('Driver not set');
      }
    }
    checkDriver();
  }, [])
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name="SignIn" component={LogIn} options={{headerShown:false}}/>
          <AuthStack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
          <AuthStack.Screen name="HOME" component={MainDrawer} options={{headerShown:false}}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
