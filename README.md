# Money Manager - React Native
An app that keeps track of your incomes and expenses based on the categories: food, social life, self development, transportation, culture, household, apparel, beauty, health, education, gift, other.

# Screenshots

![](https://github.com/kolonia/icons/blob/master/screenshots/57180256_2576649529076150_7396967297656553472_n.jpg)
![](https://github.com/kolonia/icons/blob/master/screenshots/56749059_411714619629759_6965306299676360704_n.jpg)
![](https://github.com/kolonia/icons/blob/master/screenshots/56881430_431550644283839_4369319300222156800_n.jpg)
![](https://github.com/kolonia/icons/blob/master/screenshots/56894554_587222708354560_1943551660118769664_n.jpg)
![](https://github.com/kolonia/icons/blob/master/screenshots/57000766_354440865185801_1666268970920968192_n.jpg)
![](https://github.com/kolonia/icons/blob/master/screenshots/56734862_2247082908877239_1913743337249046528_n.jpg)

# Installation and usage

This project works fine for Android (for now, zero test has been done on IOS version).

### Running the project 
Clone this repository :

`$ git clone https://github.com/kolonia/moneymanager.git`
`cd moneymanager`

Install packages:

`$npm start`

# React and expo version
- react: 16.5.0
- expo: 32.0.0

# Plugins used
- react-navigation


# Components used

- StyleSheet
- Image
- Platform
- createBottomTabNavigator
- createAppContainer
- View
- Text
- TouchableOpacity
- Constants
- ScrollView
- TextInput
- Button
- Alert
- Picker
- AsyncStorage
- DatePickerIOS
- DatePickerAndroid
- Dimensions
- Flatlist
- BackHandler
- Modal

# Custom components

### CategoryInformationContainer

Category information container is a container to show information about a specific category.

#### Props
Name | Type | Required | Description | Example
------------- | ------------- |------------- | -------------| -------------
icon | string | Yes | Uri of an icon of the category | icon = "https://raw.githubusercontent.com/kolonia/icons/master/icon.png"
category | string | Yes | Category name | category = "Category"
spent | number | Yes | Total money spent on specific category | spent = 30
total | number | Yes | Total money spent in general | total = 50

.
### FloatingButton
Floating Button is a round button that has a specific place in the screen.
#### Props

Name | Type | Required | Description | Example
------------- | ------------- |------------- | -------------| -------------
onPress | function | Yes | Function of what will happen after pressing the button | onPress = { () => ...}


### Header
Header is a container with specific design in order to be used for all the headers of the app.
#### Props

Name | Type | Required | Description | Example
------------- | ------------- |------------- | -------------| -------------
text | string | Yes | The text it will appear as a header | text = "Header"
fontLook | object | No | The look the text appears | fontLook = {fontSize : 24, ...}

### Subheader
Subheader is a container with specific design, in order to be used for all the subheaders of the app.

#### Props

Name | Type | Required | Description | Example
------------- | ------------- |------------- | -------------| -------------
text | string | Yes | The text it will appear as a header | text = "Subheader"
fontLook | object | No | The look the text appears | fontLook = {fontSize : 16, ...}

### TransactionsContainer
Transactions Container is a container with specific design to show information about a transaction.
#### Props

Name | Type | Required | Description | Example
------------- | ------------- |------------- | -------------| -------------
item | object | Yes | A container that shows information about a transaction | item = {...}

## Screens
The app is divived into three screens, in which the user can navigate to.

### AddScreen

The add screen is where the user adds new entries, by giving information such as name, category, date and amount.

### HistoryScreen

The history screen is where the user can look at the transactions made in a specific time span. The date range can be chosen by the user.

### HomeScreen

The home screen shows the user general information about the transactions. For example total money earnt and spent, the number of the transactions and percentages for the categories

