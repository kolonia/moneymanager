import React from 'react';
import { AsyncStorage, DatePickerIOS, BackHandler, StyleSheet, Platform, Text, View, Modal, TouchableOpacity, Button, DatePickerAndroid } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FloatingButton from "../components/FloatingButton";
import TransactionContainer from "../components/TransactionContainer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

let totalAvailable = 0;

const styles = StyleSheet.create({

    modalContainer : { flex : 1, alignItems : "center", justifyContent : "center", backgroundColor : 'rgba(0, 0, 0, 0.6)'},
    innerContainer : { width : "80%", alignItems : "center", justifyContent : "space-around", height : 200, paddingBottom : 20, paddingTop : 20, backgroundColor : 'white', borderColor : "#254e58", borderWidth : 3, borderRadius: 20},
    dateSectionContainer : {width : "100%", alignItems : "flex-start", justifyContent : "space-around", height : 70},
    dateSectionStyle : {flexDirection : "row", justifyContent : "space-between", alignItems : "center", paddingLeft : "20%", paddingRight : 8, width : "80%"},
    dateContainer : {backgroundColor : 'white', height : 32, alignItems: "center", width : "60%", justifyContent : "center", borderWidth : 1, borderColor : "#254e58", borderRadius : 10},
    dateRangeContainer : {paddingTop : 20, paddingBottom: 20, alignItems : "center", justifyContent: "center"},
    dateRangeText : {fontWeight : "bold", fontSize : 15, color : 'grey'},
    statusContainer : { flexDirection: "row", alignItems : "center", justifyContent : "space-around", paddingTop : 10, paddingBottom : 10},
    totalAvailableLabel: {fontSize : 16, color : 'grey'},
    totalAvailableText : {fontWeight : "bold", fontSize : 20, color : 'grey'},
    percentageView : {paddingLeft : "3%", width : "97%", paddingTop : 10, paddingBottom : 10}

});


const platformOS = Platform.OS.toLowerCase();

class HistoryScreen extends React.Component {

    enteringDates = () => {
        AsyncStorage.getItem("transactions",
        function(inError, inTransactions) {
        if (inTransactions === null) {
            inTransactions = [ ];
        } else {
        inTransactions = JSON.parse(inTransactions);
        }

        const boundedTransactions = [];
        totalAvailable = 0;


        const fromDateValue = parseInt("" + this.state.fromYear + (this.state.fromMonth + 9) + (this.state.fromDay + 9));
        const toDateValue = parseInt("" + this.state.toYear + (this.state.toMonth + 9) + (this.state.toDay + 9));

        

        console.log(fromDateValue);
        console.log(toDateValue);

        for (let i = inTransactions.length - 1; i >= 0; i--) {

            const item = inTransactions[i];
            const itemValue = parseInt("" + item.year + (item.month + 9) + (item.day + 9));

            if ( itemValue >= fromDateValue){
                if(itemValue <= toDateValue){
                    boundedTransactions.push(item);
                }
                else{
                    break;
                }
            }

            if(item.isIncome){
                totalAvailable = totalAvailable + parseFloat(item.amount);
            } else{
                totalAvailable = totalAvailable - parseFloat(item.amount);
            }                                            
        }
        this.setState({
            totalAvailable : totalAvailable,
            dateVisible : false,
            change : !this.state.change,
            transactions : boundedTransactions.reverse()
        }
        );
        }.bind(this)
        );
   
    }

    constructor(inProps) {

        super(inProps);
    
        this.state = {
          totalAvailable : 0,
          transactions : [],
          dateVisible : false,
          toYear : new Date().getFullYear(),
          toMonth : new Date().getMonth() + 1,
          toDay: new Date().getDate(),
          fromYear : new Date().getFullYear(),
          fromMonth : new Date().getMonth() + 1,
          fromDay: new Date().getDate(),
          toDate : new Date(),
          fromDate : new Date(),
          change : true,
        };
    
    }
    

    render() {
        return (
            <View style={{flex : 1}}>

                    <Modal
                    presentationStyle = {"overFullScreen"}
                    transparent = {true}
                    visible = {this.state.dateVisible}
                    animationType = {"slide"}
                    onRequestClose= {() => { }}>
                        <View style= {styles.modalContainer}> 
                            <View style = {styles.innerContainer}>
                                <View style = {styles.dateSectionContainer}>

                                    <View style= {styles.dateSectionStyle}>
                                        <Text>From:</Text>
                                        {platformOS === "android" ?(
                                        <TouchableOpacity 
                                            style= {styles.dateContainer}
                                            onPress={ async () => {
                                                const { action, year, month, day } = await DatePickerAndroid.open({
                                                date : new Date() });
                                                this.setState({ fromYear : year, fromMonth : (month + 1), fromDay : day})
                                            }}>
                                                <Text> {this.state.fromDay}/{this.state.fromMonth}/{this.state.fromYear}</Text>
                                        </TouchableOpacity>) :
                                        (
                                            <DatePickerIOS
                                                mode = "date"
                                                date = {this.state.fromDate}
                                                onDateChange = { (newDate) => this.setState({fromDate : newDate, fromYear : newDate.getFullYear, fromMonth : (newDate.getMonth + 1), fromDay : newDate.getDate})}>
                                            
                                            </DatePickerIOS>
                                        )
                                        }
                                    </View>
                                    <View style= {styles.dateSectionStyle}>
                                        <Text>To:</Text>
                                        {platformOS === "android" ? (
                                        <TouchableOpacity 
                                            style= {styles.dateContainer}
                                            onPress={ async () => {
                                                const { action, year, month, day } = await DatePickerAndroid.open({
                                                    date : new Date() });
                                                    this.setState({ toYear : year, toMonth : (month + 1), toDay : day})
                                            }}>
                                            <Text> {this.state.toDay}/{this.state.toMonth}/{this.state.toYear}</Text>

                                        </TouchableOpacity> ) : 
                                    (
                                        <DatePickerIOS
                                            mode = "date"
                                            date = {this.state.toDate}
                                            onDateChange = { (newDate) => this.setState({toDate : newDate, toYear : newDate.getFullYear, toMonth : (newDate.getMonth + 1), toDay : newDate.getDate})
                                            }
                                        >
                                            
                                        </DatePickerIOS>
                                    )}
                            
                                    </View>
                                </View>
                                <Button
                                    color = '#88bdbc'
                                    title = "ENTER"
                                    onPress= { this.enteringDates }>
                                    
                                </Button>
                            </View>
                        </View>

                    </Modal>
                <View>
                    <Header text = "History"/>


                    <View style ={styles.dateRangeContainer}>
                        <Text style={styles.dateRangeText}>Your Transactions from {this.state.fromDay}/{this.state.fromMonth}/{this.state.fromYear} to {this.state.toDay}/{this.state.toMonth}/{this.state.toYear}</Text>
                    </View>


                    <SubHeader text = "Agregated Financial Status"/>
                    
                    <View style = {styles.statusContainer}>
                            <Text style={styles.totalAvailableLabel}>Total Available:</Text>
                            <Text style={styles.totalAvailableText}> {this.state.totalAvailable} SEK </Text>
                    </View>

                    <SubHeader text = " Transactions"/>

                </View>


                <FlatList
                        
                    style ={styles.percentageView}
                    data = {this.state.transactions}
                    extraData = {this.state.change}
                    renderItem= { ({ item }) =>                   
                            <TransactionContainer item = {item}/>
                }/>

                <FloatingButton 
                    onPress={ () => { this.setState( { dateVisible : true});}}/>
            </View>
        );
    }

    componentDidMount() {

        // Block hardware back button on Android.
        BackHandler.addEventListener(
          "hardwareBackPress", () => { return true; }
        );

        AsyncStorage.getItem("transactions",
            function(inError, inTransactions) {
            if (inTransactions === null) {
                inTransactions = [ ];
            } else {
                inTransactions = JSON.parse(inTransactions);
            }

            const boundedTransactions = [];
            totalAvailable = 0;
            let date = new Date();


            let dateValue = parseInt("" + date.getFullYear() + (date.getMonth() + 9) + (date.getDate() + 9));

                                

            for (let i = inTransactions.length - 1; i >= 0; i--) {

                const item = inTransactions[i];
                const itemValue = parseInt("" + item.year + (item.month + 10) + (item.day + 9));

                if ( itemValue = dateValue){
                    boundedTransactions.push(item);
                    
                                            

                    if(item.isIncome){
                        totalAvailable = totalAvailable + parseFloat(item.amount);
                    } else{
                        totalAvailable = totalAvailable - parseFloat(item.amount);
                    }                                            
                }
            }
            this.setState({
                totalAvailable : totalAvailable,
                dateVisible : false,
                change : !this.state.change,
                transactions : boundedTransactions.reverse()
            }
            );
            
        
        }.bind(this)
        );    
    };
}




exports.HistoryScreen = HistoryScreen;