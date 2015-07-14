var  React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard')

var {
  View,
  Text,
  StyleSheet,
  TextInput,  // Capture user input
  TouchableHighlight, // Capture user touch.
  ActivityIndicatorIOS // Show or hide spinner. 
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48bbec'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    } 
  }

  handleChange (event) {
    this.setState({
      username: event.nativeEvent.text
    })
  }
  handleSubmit () {
    // update our IndicatorIOS spinner
    this.setState({
      isLoading:true
    })
    // fetch data from github
    api.getBio(this.state.username)
      .then((res) => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an option",
            component: Dashboard,
            passProps: {userInfo: res}
          });
          // if the user returns to the previos page.username is no longer set.
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      });
    // reroute us to the next route passing in the github information.
  }

  render () {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : null
    )
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a github User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}> SEARCH </Text>
          </TouchableHighlight>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#111"
            size="large">
          </ActivityIndicatorIOS>
          {showErr}
      </View>
    )
  }
};

module.exports = Main;