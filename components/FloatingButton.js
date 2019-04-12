import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    buttonStyle : {width : 60, height : 60, borderRadius : 30, backgroundColor : "#88bdbc", alignItems : "center", justifyContent: 'center',
    position: 'absolute', right: 20, bottom: 20},
    iconSize :{ width : 30, height : 30},

});


class FloatingButton extends Component {
    render(){
        const { onPress } = this.props;      
    
    return (
        <TouchableOpacity
            style = {styles.buttonStyle}
            onPress = { () => {onPress()}}
        >
            <Image source={require("../images/icon-calendar.png")}
            style={styles.iconSize}></Image>
        </TouchableOpacity>
      );
  
    }
}

FloatingButton.propTypes = {
    onPress : PropTypes.func.isRequired
};

export default FloatingButton;
