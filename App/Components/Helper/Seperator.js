var React = require('react-native');

var {
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15
  }
});

class Seperator extends React.Component {
  render () {
    return (
      <View style={styles.seperator}/>
    )
  }
};

module.exports = Seperator;