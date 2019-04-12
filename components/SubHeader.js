import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    subHeaderContainer :{height : 40, width : "100%", justifyContent: "center", paddingLeft : 30, backgroundColor : "#254e58", borderTopWidth : 1, borderBottomWidth : 1, borderBottomColor : "grey", borderTopColor : "grey"},
    subheaderText : {color : 'white', fontSize : 16, fontWeight : "normal", fontFamily : 'notoserif'}
});


class SubHeader extends Component {
    render(){
        const { text } = this.props;      
    
    return (
        <View style={styles.subHeaderContainer}>
            <Text style= {styles.subheaderText}>{text}</Text>
        </View>
      );
  
    }
}



SubHeader.propTypes = {
    text : PropTypes.string.isRequired,
    fontLook : PropTypes.object,
};

export default SubHeader;
