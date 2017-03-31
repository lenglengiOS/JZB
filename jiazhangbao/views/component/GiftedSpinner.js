'use strict'

import React from 'react';

import {
  View,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Platform
} from 'react-native';

var GiftedSpinner = React.createClass({

  _getSpinner() {
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid
          style={{
            height: 20,
          }}
          styleAttr="Inverse"
          {...this.props}
        />
      );
    } else {
      return (
        <ActivityIndicatorIOS
          animating={true}
          {...this.props}
        />
      );
    }
  },

  render() {
    return (
      <View>
        {this._getSpinner()}
      </View>
    );
  },

});


module.exports = GiftedSpinner;
