import React from 'react';
import { Button, Alert, Picker, AsyncStorage,  TouchableOpacity, DatePickerIOS, Platform , DatePickerAndroid, StyleSheet, Text, View, Dimensions} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Header from "../components/Header";

const platformOS = Platform.OS.toLowerCase();


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    
    pageContainer : {flex : 1, width : windowWidth, height : windowHeight},
    tab : {height: 40, width: "50%",alignItems: "center", justifyContent: "center"},
    selectLine : {width : "50%", height : 2, backgroundColor : "#254e58"},
    innerContainer : {flex : 1, backgroundColor : "#ecf0f1", alignItems : "center"},
    sectionContainer : { width : "60%", justifyContent : "space-around", alignItems : "flex-start", height : 100, paddingTop: 10, paddingBottom: 10},
    textInput : {height : 40, width : "100%", backgroundColor : "white", borderRadius : 9, textAlign : "center"},
    label : {fontSize : 20, fontWeight : "bold", color : '#254e58'},
    picker : {backgroundColor : "white", height : 40, width : "100%", borderRadius : 9},
    dateContainer : {height : 40, width : "100%", backgroundColor : "white", borderRadius : 9, alignItems : "center", justifyContent : "center"},
    buttonContainer : {paddingTop : 20, height : 40, width : "60%"}



});



class AddScreen extends React.Component {

    adding = () =>{
        AsyncStorage.getItem("transactions",
            function(inError, inTransactions) {
                if (inTransactions === null) {
                    inTransactions = [ ];
                } else {
                    inTransactions = JSON.parse(inTransactions);
                }                                    
                inTransactions.push(this.state);

                for (let i = inTransactions.length - 1; i > 0; i--) {
                    const right = inTransactions[i-1];
                    const left = inTransactions[i];
                    const rightValue = parseInt("" + right.year + (right.month + 9) + (right.day + 9));
                    const leftValue = parseInt("" + left.year + (left.month + 9) + (left.day + 9));

                                    
                    if ( rightValue < leftValue){
                        inTransactions[i - 1] = left;
                        inTransactions[i] = right
                    }     
                }

                AsyncStorage.setItem("transactions",
                    JSON.stringify(inTransactions), function() {
                        this.setState({
                            name : "",
                            year : new Date().getFullYear(),
                            month : new Date().getMonth() + 1,
                            day: new Date().getDate(),
                            category : "Food",
                            amount : "0", 
                            isIncome : false,
                            key :  `r_${new Date().getTime()}`
                                                    
                        });
                    }.bind(this)
                );}.bind(this)
            );

            Alert.alert(
                "Your transcaction has been added",                                    
                "Press OK to continue",
                [ { text : "OK" } ],
                { cancelable : false }
            );
                                    
        }
    


    constructor(inProps) {

        super(inProps);
    
        this.state = {
            start : true,
            name : "",
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            day: new Date().getDate(),
            date : new Date(),
            category : "Food",
            amount : "0", 
            isIncome : false,
            key :  `r_${new Date().getTime()}`
        };
    
    }

    render(){

        return(
            <View>
                <Header text = "New entry"/>
                <View style = {{flexDirection: "row"}}>
                        <View style= {[styles.tab , {borderRightColor : "#254e58", borderRightWidth : 1}]}>
                            <Text> Expense </Text>
                        </View>

                        <View style= {[styles.tab, { borderLeftColor : "#254e58", borderLeftWidth : 1}]}>
                            <Text> Income </Text>
                        </View>
                </View>


                <ScrollView 
                    horizontal = {true}
                    pagingEnabled = {true}>


                    <View style = {styles.pageContainer}>

                        <View style = {styles.selectLine}></View>


                        <View style = {styles.innerContainer}>
                            <View style = {styles.sectionContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput 
                                    mode = "outlined"
                                    maxLength= {30}
                                    onChangeText= {(text) => this.setState({name : text})}
                                    value = {this.state.name}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style = {styles.sectionContainer}>
                                <Text style={styles.label}>Category</Text>
                                <View style={styles.picker}>
                                    <Picker
                                        style={{height : 40, width : "100%", justifyContent : "center", alignItems : "center"}}
                                        selectedValue = {this.state.category}
                                        prompt = "Category"
                                        onValueChange={
                                        (inItemValue) => this.setState({ category : inItemValue })
                                        }
                                        mode = "dropdown"
                                    >
                                        <Picker.Item label="Food" value="Food" />
                                        <Picker.Item label="Social Life" value="Social Life" />
                                        <Picker.Item label="Self Development" value="Self Development" />
                                        <Picker.Item label="Transportation" value="Transportation" />
                                        <Picker.Item label="Culture" value="Culture" />
                                        <Picker.Item label="Household" value="Household" />
                                        <Picker.Item label="Apparel" value="Apparel" />
                                        <Picker.Item label="Beauty" value="Beauty" />
                                        <Picker.Item label="Health" value="Health" />
                                        <Picker.Item label="Education" value="Education" />
                                        <Picker.Item label="Gift" value="Gift" />
                                        <Picker.Item label="Other" value="Other" />

                                    </Picker>
                                </View>
                            </View>

                            <View style = {styles.sectionContainer}>
                                <Text style={styles.label}>Date</Text>

                                {platformOS === "android" ?(

                                    <TouchableOpacity 
                                    
                                        style={styles.dateContainer}
                                        onPress= { async () => {const { action, year, month, day } = await DatePickerAndroid.open({
                                            date : new Date() });
                                            this.setState({ year : year, month : month + 1, day : day})
                                        }}
                                        >
                                        <Text> {this.state.day} / {this.state.month} / {this.state.year}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <DatePickerIOS
                                    mode = "date"
                                    date = {this.state.toDate}
                                    onDateChange = { (newDate) => this.setState({date : newDate, year : newDate.getFullYear, month : (newDate.getMonth + 1), day : newDate.getDate})}/>
                                )}
                            </View>

                            <View style = {styles.sectionContainer}>

                            <Text style={styles.label}>Amount: </Text>
                                <TextInput mode = ""
                                    maxLength= {12}
                                    value = {this.state.amount}
                                    onChangeText= {(text) => this.setState({amount : text})}
                                    
                                    style={styles.textInput}>
                                </TextInput>
                            </View>

                            <View style = {styles.buttonContainer}> 
                                <Button
                                color = '#88bdbc'
                                title = "ADD"
                                onPress= {this.adding}
                                    
                            >
                            </Button>
                        </View>

                        </View>

                    </View>

                    <View style = {styles.pageContainer}>

                        <View style = {{flexDirection : "row"}}>
                            <View style = {{width : "50%", height : 2}}></View>
                            <View style = {styles.selectLine}></View>

                        </View>


                        <View style = {styles.innerContainer}>
                            <View style = {styles.sectionContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput 
                                    mode = "outlined"
                                    value = {this.state.name}
                                    maxLength= {30}
                                    onChangeText= {(text) => this.setState({name : text})}
                                    style={styles.textInput}
                                />
                            </View>

                            <View style = {styles.sectionContainer}>
                                <Text style={styles.label}>Date</Text>

                                {platformOS === "android" ?(

                                    <TouchableOpacity 
                                    
                                        style={styles.dateContainer}
                                        onPress= { async () => {const { action, year, month, day } = await DatePickerAndroid.open({
                                            date : new Date() });
                                            this.setState({ year : year, month : month + 1, day : day})
                                        }}
                                        >
                                        <Text> {this.state.day} / {this.state.month} / {this.state.year}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <DatePickerIOS
                                    mode = "date"
                                    date = {this.state.toDate}
                                    onDateChange = { (newDate) => this.setState({date : newDate, year : newDate.getFullYear, month : (newDate.getMonth + 1), day : newDate.getDate})}/>
                                )}
                            </View>

                            <View style = {styles.sectionContainer}>

                            <Text style={styles.label}>Amount: </Text>
                                <TextInput mode = ""
                                    maxLength= {12}
                                    value = {this.state.amount}
                                    onChangeText= {(text) => this.setState({amount : text})}
                                    style={styles.textInput}>
                                </TextInput>
                            </View>

                            <View style = {styles.buttonContainer}> 

                                <Button
                                color = '#88bdbc'
                                title = "ADD"
                                onPress= {this.adding}

                            >
                            </Button>
                        </View>
                        </View>


                    </View>
                </ScrollView>
            </View>
        );

    }
}


exports.AddScreen = AddScreen;