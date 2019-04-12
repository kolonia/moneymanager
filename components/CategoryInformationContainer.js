import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Image } from "react-native";


const styles = StyleSheet.create({
    container : {paddingRight : 5, paddingLeft : 5},
    innerContainer : { flexDirection : "row", justifyContent : "space-between", paddingTop : 10, paddingBottom : 10},
    iconStyle : { width : 20, height : 20, tintColor : "black" },
    category :{ flexDirection : "row", alignItems :  "center"},
    categoryText : {fontWeight : "normal", fontSize : 16, color : 'black'},
    amountText : {fontWeight : "normal", fontSize : 16, color : '#34495e', textAlign : "left"},
    percentageBar : {flexDirection : "row", height :6, width : "100%"}
});


class CategoryInformationContainer extends Component {
    render(){
        const { icon, category, spent, total } = this.props;      
    
    return (
        <View style = {styles.container}>
            <View style = {styles.innerContainer}>
                <View style = {styles.category}>
                    <Image source= {{ uri : icon}}
                        style={styles.iconStyle} />
                    <Text style= {styles.categoryText}> {category} </Text>
                </View>
                <View>
                    <Text style= {styles.amountText}> {spent} SEK </Text>
                </View>
            </View>

            <View style = {styles.percentageBar}>
                <View style= {{backgroundColor : '#88bdbc', width : "" + ((spent/total)*100) + "%"}}></View>
                <View style= {{backgroundColor : '#bdc3c7', flex : 1}}></View>
            </View>
        </View>
      );
  
    }
}



CategoryInformationContainer.propTypes = {
    icon : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,
    spent : PropTypes.number.isRequired,
    total : PropTypes.number.isRequired
};

export default CategoryInformationContainer;
