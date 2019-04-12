import React, { Component } from "react";
import PropTypes from "prop-types";
import { Constants } from "expo";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    statusBar : {backgroundColor: "#254e58", height: Constants.statusBarHeight},
    headerContainer : {height : 44, width : "100%", justifyContent: "center", paddingLeft : 30, backgroundColor : "#254e58"},
    headerText : {color : 'white', fontSize : 25, fontWeight : "bold", fontFamily : 'notoserif'}
});


class Header extends Component {
    render(){
        const { text, fontLook } = this.props;      
    
    return (
        <View>
            <View style= {styles.statusBar}></View>

            <View style = {styles.headerContainer}>
                <Text style= {[styles.headerText, fontLook]}>{text}</Text>
            </View>

            <View style = {{backgroundColor : "grey", height : 1}}></View>
        </View>
      );
  
    }
}



Header.propTypes = {
    text : PropTypes.string.isRequired,
    fontLook : PropTypes.object,
};

export default Header;
