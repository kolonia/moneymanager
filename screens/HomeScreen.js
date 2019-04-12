import React from 'react';
import { AsyncStorage, StyleSheet, Text, Button, View, TouchableOpacity, DatePickerAndroid, Platform, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from "../components/Header";
import SubHeader from "../components/SubHeader"
import CategoryInformationContainer from "../components/CategoryInformationContainer";


const categories = ["Food", "Social Life", "Self Development", "Transportation", "Culture", "Household", "Apparel", "Beauty", "Health", "Education", "Gift", "Other"];

const platformOS = Platform.OS.toLowerCase();


const styles = StyleSheet.create({
    dateContainer : { flexDirection : "row", justifyContent : "space-around", alignItems : "flex-start", width : "100%", paddingTop : 10, paddingBottom : 10},
    dateSectionContainer : {alignItems : "center"},
    calendarContainer : {backgroundColor : 'white', height : 32, alignItems: "center", justifyContent : "center", borderWidth : 1, borderColor : "#254e58", borderRadius : 10},
    overviewInnerContainer : { flexDirection: "row", alignItems : "center", justifyContent : "space-around", paddingTop : 10, paddingBottom : 10},
    buttonContainer : { width : "70%", paddingBottom : 10},
    earntLabel : {fontSize : 16, color : '#006400'},
    spentLabel :{fontSize : 16, color: '#8B0000', textAlign : "right"},
    transactionsLabel :{fontSize : 16, color : 'grey'},
    earntStyle : {fontWeight : "bold", fontSize : 24, color : '#006400'},
    spentStyle : {fontWeight : "bold", fontSize : 24, color : '#8B0000', textAlign : "right"},
    transactionsStyle :{fontWeight : "bold", fontSize : 20, color : 'grey'},
    categoriesContainer : {paddingBottom : 10,  paddingLeft : "7%", width : "93%"},
});

class HomeScreen extends React.Component {

    search = () => {
        AsyncStorage.getItem("transactions",
        function(inError, inTransactions) {
        if (inTransactions === null) {
            inTransactions = [ ];
        } else {
            inTransactions = JSON.parse(inTransactions);
        }
    

        let totalEarnt = 0; 
        let totalSpent = 0; 
        let totalTransactions = 0;
        let totalCategories = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        const fromDateValue = parseInt("" + this.state.fromYear + (this.state.fromMonth + 9) + (this.state.fromDay + 9));
        const toDateValue = parseInt("" + this.state.toYear + (this.state.toMonth + 9) + (this.state.toDay + 9));

        for (let i = inTransactions.length - 1; i >= 0; i--) {

            const item = inTransactions[i];
            const itemValue = parseInt("" + item.year + (item.month + 9) + (item.day + 9));

            console.log(itemValue);


            if ( itemValue >= fromDateValue){
                if(itemValue <= toDateValue){
                    if(item.isIncome){
                        totalEarnt = totalEarnt + parseFloat(item.amount);
                    } else{
                        totalSpent = totalSpent + parseFloat(item.amount);
                    }
                    for( let j = 0; j < categories.length; j++){
                        let category = categories[j];
                        if(category === item.category){
                            totalCategories[j] = totalCategories[j] + parseFloat(item.amount);
                        }
                    }
                    totalTransactions = totalTransactions + 1;   
                }
                else{
                    break;
                }
            }
            this.setState({totalEarnt : totalEarnt, totalSpent : totalSpent, totalCategories : totalCategories, totalTransactions : totalTransactions});                        
        }
    }.bind(this)
    );

    }


    constructor(inProps) {

        super(inProps);
    
        this.state = {
          totalEarnt : 0,
          totalSpent : 0,
          totalTransactions : 0,
          totalCategories : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          toYear : new Date().getFullYear(),
          toMonth : new Date().getMonth() + 1,
          toDay: new Date().getDate(),
          fromYear : new Date().getFullYear(),
          fromMonth : new Date().getMonth() + 1,
          fromDay: new Date().getDate(),
          toDate : new Date(),
          fromDate : new Date()
        };
    
    }

    render() {
        return (
            <View style={{flex : 1}}>
                <View>
                    <Header text = "Money Manager"/>

                    <View style = {styles.dateSectionContainer}>
                        <View style = {styles.dateContainer}>
                            <View style= {{width : "44%"}}>
                                <Text>From:</Text>
                                {platformOS === "android" ? (
                                    <TouchableOpacity 
                                        style= {styles.calendarContainer}
                                        onPress={ async () => {
                                        const { action, year, month, day } = await DatePickerAndroid.open({
                                        date : new Date() });
                                        this.setState({ fromDay : day, fromMonth : month + 1, fromYear : year})
                                    }}>
                                        <Text> {this.state.fromDay} / {this.state.fromMonth} / {this.state.fromYear}</Text>
                                    </TouchableOpacity>
                                    ) : (
                                        <DatePickerIOS
                                            mode = "date"
                                            date = {this.state.fromDate}
                                            onDateChange = { (newDate) => this.setState({fromDate : newDate, fromYear : newDate.getFullYear, fromMonth : (newDate.getMonth + 1), fromDay : newDate.getDate})}/>
                                    )
                                }
                            </View>
                            <View style= {{width : "44%"}}>
                                <Text>To:</Text>
                                {platformOS === "android" ? (

                                    <TouchableOpacity 
                                        style= {styles.calendarContainer}
                                        onPress={ async () => {
                                        const { action, year, month, day } = await DatePickerAndroid.open({
                                        date : new Date() });
                                        this.setState({toDay : day, toMonth : month + 1, toYear : year})

                                    }}>
                                    <Text> {this.state.toDay} / {this.state.toMonth} / {this.state.toYear}</Text>

                                    </TouchableOpacity>
                                    ) : (
                                        <DatePickerIOS
                                            mode = "date"
                                            date = {this.state.toDate}
                                            onDateChange = { (newDate) => this.setState({toDate : newDate, toYear : newDate.getFullYear, toMonth : (newDate.getMonth + 1), toDay : newDate.getDate})}/>
                                    )
                                }
                                
                            </View>
                        </View>
                        <View style = {styles.buttonContainer}>

                            <Button title = 'Enter'
                                color = "#88bdbc" 
                                onPress= {this.search}></Button>
                        </View>
                    </View>

                    <SubHeader text = "Overview"/>


                    <View style = {styles.overviewInnerContainer}>
                        <View >
                            <Text style={styles.earntLabel}>Total Earnt:</Text>
                            <Text style={styles.earntStyle}>{this.state.totalEarnt} SEK</Text>

                        </View>
                        <View>
                            <Text style= {styles.spentLabel}>Total Spent:</Text>
                            <Text style= {styles.spentStyle}>{this.state.totalSpent} SEK</Text>
                        </View>
                    </View>

                    <View style = {{backgroundColor : "grey", height : 1}}></View>
                    
                    <View style = {styles.overviewInnerContainer}>
                            <Text style={styles.transactionsLabel}>Total Transactions:</Text>
                            <Text style={styles.transactionsStyle}>{this.state.totalTransactions} Transactions</Text>
                    </View>

                    <SubHeader text = "Speding Categories"></SubHeader>
                </View>
                <ScrollView style = {styles.categoriesContainer}>

                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-food.png.png" category = "Food" spent = {this.state.totalCategories[0]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-social_life.png" category = "Social Life" spent = {this.state.totalCategories[1]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-self_development.png.png" category = "Self Development" spent = {this.state.totalCategories[2]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-transportation.png.png" category = "Transportation" spent = {this.state.totalCategories[3]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-culture.png.png" category = "Culture" spent = {this.state.totalCategories[4]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-household.png.png" category = "Household" spent = {this.state.totalCategories[5]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-apparel.png.png" category = "Apparel" spent = {this.state.totalCategories[6]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-beauty.png.png" category = "Beauty" spent = {this.state.totalCategories[7]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-health.png.png" category = "Health" spent = {this.state.totalCategories[8]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-education.png.png" category = "Education" spent = {this.state.totalCategories[9]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-gift.png" category = "Gift" spent = {this.state.totalCategories[10]} total = {this.state.totalSpent}/>
                    <CategoryInformationContainer  icon = "https://raw.githubusercontent.com/kolonia/icons/master/images/icon-other.png" category = "Other" spent = {this.state.totalCategories[11]} total = {this.state.totalSpent}/>
        
                        
                    <View style = {{height : 20}}></View>
            
                </ScrollView>
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
        }else {
            inTransactions = JSON.parse(inTransactions);
        }
                    
        let date = new Date();

        let totalEarnt = 0; 
        let totalSpent = 0; 
        let totalTransactions = 0;
        let totalCategories = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let dateValue = parseInt("" + date.getFullYear() + (date.getMonth() + 10) + (date.getDate() + 9));

        for (let i = inTransactions.length - 1; i >= 0; i--) {

            const item = inTransactions[i];
            const itemValue = parseInt("" + item.year + (item.month + 9) + (item.day + 9));



            if ( itemValue = dateValue){
                if(item.isIncome){
                    totalEarnt = totalEarnt + parseFloat(item.amount);
                } else{
                    totalSpent = totalSpent + parseFloat(item.amount);
                    for( let j = 0; j < categories.length; j++){
                        let category = categories[j];
                        if(category === item.category){
                            totalCategories[j] = totalCategories[j] + parseFloat(item.amount);
                        }
                    }
                }
                
                totalTransactions = totalTransactions + 1;   
            }                               
        }
        this.setState({totalEarnt : totalEarnt, totalSpent : totalSpent, totalCategories : totalCategories, totalTransactions : totalTransactions});                        
                        
                    
    }.bind(this)
        );
    
    };
}


exports.HomeScreen = HomeScreen;