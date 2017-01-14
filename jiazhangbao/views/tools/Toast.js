'use strict';

/**
 * This exposes the native ToastAndroid module as a JS module. This has a function 'show'
 * which takes the following parameters:
 */
 import React from 'react';
import {
    Platform
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import {ToastAndroid} from 'react-native'
import MyToast from '../component/react-native-toast'
var ToastTool = {
    show: function (msg,callback) {
        if(typeof(msg)=="object"){
            msg=JSON.stringify(msg)
        }
     //   ToastAndroid.show(msg,ToastAndroid.SHORT)
        // Toast.show({
        //     message: msg,
        //     duration: "short",
        //     position: "bottom"
        // })
       // RCTDeviceEventEmitter.emit('toast', msg);
        if(mToast){
          mToast.destroy();
        }
        var mToast = MyToast.show(msg,{
          duration:MyToast.durations.SHORT,
          position:Platform.OS=='ios'?MyToast.positions.CENTER:MyToast.positions.BOTTOM,
          animation:true,
          shadow:true,
          hideOnPress:true,
          onHidden: () => {
                mToast.destroy();
                if(callback&&typeof(callback)=="function"){
                  callback();
                }        
                mToast = null;
            }
        })
    },
    showLongBottom: function (msg) {
        // Toast.show({
        //     message: msg,
        //     duration: "long",
        //     position: "bottom"
        // })
    },

}
module.exports = ToastTool