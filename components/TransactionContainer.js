import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : { flexDirection : "row", justifyContent : "space-between", alignItems : "center", paddingLeft : 5, paddingRight : 5, paddingTop : 10, paddingBottom : 10, width : "100%", borderBottomColor : "grey", borderBottomWidth : 1},
    name : {fontSize : 16, color : "black"},
    date : {fontSize : 12, color : "grey"},
    incomeAmount : {fontSize : 16, color : "#006400"},
    expenseAmount : {fontSize : 16, color : "#8B0000"}
});


class TransactionContainer extends Component {
    render(){
        const { item } = this.props;      
    
    return (
        <View style= {styles.container}>
            <View>
                <Text style = {styles.name}>{item.name}</Text>
                <Text style = {styles.date}>{item.day}/{item.month}/{item.year}</Text>
            </View>

            <Text style = {item.isIncome ? styles.incomeAmount : styles.expenseAmount}>{item.amount} SEK</Text>

        </View>
      );
  
    }
}



TransactionContainer.propTypes = {
    item : PropTypes.object.isRequired
};

export default TransactionContainer;
