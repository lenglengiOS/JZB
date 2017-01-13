/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TabBarMain from './views/main/tabBarMain';

export default class jiazhangbao extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TabBarMain />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFF'
  },
});

AppRegistry.registerComponent('jiazhangbao', () => jiazhangbao);
