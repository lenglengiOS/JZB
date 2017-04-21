/**
 * @author lovebing
 */

import React, {
  Component,
  PropTypes
} from 'react';

import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ActionSheetIOS,
  Alert,
  Linking,
  NativeModules
} from 'react-native';

import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console,IPAddr,BimgURL,LimgURL} from '../constStr';
var NativeTools = NativeModules.NativeTools;

export default class BaiduMapDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:props.param.name,
      address:props.param.address,
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: props.param.lng*1,
        latitude: props.param.lat*1
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [
        {
          longitude: props.param.lng*1,
          latitude: props.param.lat*1,
          title: props.param.name
        },
        {
          longitude: props.param.longitude,
          latitude: props.param.latitude,
          title: '我的位置'
        }
      ]
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
      NativeTools = null;
  }

  back(){
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop() 
      }
  }

  gotoOtherMap(){
    var BUTTONS = [
      '百度地图',
      '自带地图',
      '取消',
    ];
    var CANCEL_INDEX = 2;
    ActionSheetIOS.showActionSheetWithOptions({
      message: '用以下地图打开',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
        if(buttonIndex == 0)
        {
          // 跳转到百度地图
          Linking.canOpenURL('baidumap://').then(supported => { // weixin://  alipay://
            if (supported) {
              Linking.openURL('baidumap://');
            } else {
                var alertMessage = '';
                Alert.alert(
                  '未安装百度地图',
                  alertMessage,
                  [
                    {text: '确定'},
                  ]
                )
            }
          }).catch(err => {return});
          
        }
        if(buttonIndex == 1)
        {
          // 跳转到苹果自带的高德地图
          NativeTools.getLHLMap();
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}/>
        <MapView 
          trafficEnabled={this.state.trafficEnabled}
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
          zoom={this.state.zoom}
          mapType={this.state.mapType}
          center={this.state.center}
          marker={this.state.marker}
          markers={this.state.markers}
          style={styles.map}
          onMapClick={(e) => {
          }}
        >
        </MapView>
        <TouchableOpacity style={styles.back} activeOpacity={1} onPress={()=>this.back()}>
          <Image source={JZBImages.back} style={{width:25, height:25}} />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={{fontSize:14, marginTop:15, marginLeft:10}}>{this.state.name}</Text>
          <Text style={{fontSize:13, color:'#A1A1A1', marginTop:15, marginLeft:10}}>{this.state.address}</Text>
          <TouchableOpacity style={styles.other} activeOpacity={1} onPress={()=>this.gotoOtherMap()}>
            <Text style={{fontSize:14, color:'#A1A1A1'}}>其他地图</Text>
          </TouchableOpacity>

        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    width:screenWidth,
    height:80,
    backgroundColor:'#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex:1,
    width:screenWidth
  },
  back:{
    width:44,
    height:44,
    backgroundColor:'#FFF',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:20,
    left:0
  },
  other:{
    width:70, 
    height:28, 
    position:'absolute', 
    right:10, 
    top:10, 
    borderWidth:1, 
    borderColor:'#E8E8E8', 
    borderRadius:4, 
    backgroundColor:'#FFF',
    justifyContent:'center',
    alignItems:'center'
  }
});




















