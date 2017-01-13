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
  View,
  Navigator
} from 'react-native';

import TabBarMain from './views/main/tabBarMain';

export default class jiazhangbao extends Component {
  render() {
    return (

       <Navigator
          initialRoute={{ name: 'main', component: TabBarMain }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }} />
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
