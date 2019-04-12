import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from "react-navigation"
import { HomeScreen } from "./screens/HomeScreen";
import { AddScreen } from "./screens/AddScreen";
import { HistoryScreen } from "./screens/HistoryScreen";

const platformOS = Platform.OS.toLowerCase();


const styles = StyleSheet.create({   
  iconSize : {height : 32, width : 32},
});

const tabs = createBottomTabNavigator({

  HomeScreen : { 
    screen : HomeScreen,
    navigationOptions : {
      tabBarIcon : ( { tintColor } ) => (
        <Image source= { require("./images/icon-home.png")}
        style={[styles.iconSize, {tintColor : tintColor }]} />
      )
    }  
  },

  

  AddScreen : { 
    screen : AddScreen,
    navigationOptions : {
      tabBarIcon : ( { tintColor } ) => (
        <Image source= { require("./images/icon-add.png")}
        style={[styles.iconSize, {tintColor : tintColor }]} />
      )
    }  
  },
  
  HistoryScreen : { 
    screen : HistoryScreen,
    navigationOptions : {
      tabBarIcon : ( { tintColor } ) => (
        <Image source= { require("./images/icon-history.png")}
        style={[styles.iconSize, {tintColor : tintColor }]} />
      )
    }  
  }
},

  {
    initialRouteName : "HomeScreen",
    animationEnabled : true,
    swipeEnabled : true,
    backBehavior : "none",
    lazy : true,
    tabBarOptions : {
      activeTintColor : "#000000",
      activeBackgroundColor : "#D3D3D3",
      inactiveTintColor : "#000000",
      inactiveBackgroundColor : "#FFFFFF",
      showLabel : false,
      showIcon : true,
      style : { backgroundColor : "#F0F0F0" }

    }

  }

);

const App = createAppContainer(tabs);

export default App;