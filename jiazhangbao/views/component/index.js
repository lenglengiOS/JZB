import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  ActionSheetIOS,
  CameraRoll
} from 'react-native'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
const { width, height } = Dimensions.get('window')
import {BimgURL,LimgURL} from '../constStr';
import Toast from '../tools/Toast';

var styles = {
  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width,
    height,
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  thumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
    flexDirection: 'row'
  },
  thumb: {
    width: 50,
    height: 50
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      left: 0,
      right: 0
    }}>
      <View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
      </View>
    </View>
  )
}

const Viewer = props => <Swiper index={props.index} loop={false} bounces={true} style={styles.wrapper} renderPagination={renderPagination}>
  {
    props.imgList.map((item, i) => <View key={i} style={styles.slide}>
      <TouchableWithoutFeedback onPress={e => props.pressHandle()}>

        <ScrollView
                contentContainerStyle={{ alignItems:'center', justifyContent:'center' }}
                centerContent={true}
                maximumZoomScale={0.5}
                minimumZoomScale={3}>
                <TouchableWithoutFeedback
                    onPress={e => props.hiden()}
                    onLongPress={e => saveImg(BimgURL+item+LimgURL)}>
                    <Image 
                      source={{uri: BimgURL+item+LimgURL}}
                      onTap={e => props.hiden()}
                      resizeMode='contain'
                      minimumZoomScale={0.5}
                      maximumZoomScale={3}
                      androidScaleType='center'
                      style={styles.photo}
                    />
                </TouchableWithoutFeedback>
            </ScrollView>
      </TouchableWithoutFeedback>
    </View>)
  }
</Swiper>


const saveImg = (img) =>{
  var BUTTONS = [
      '存储',
      '取消',
    ];
    var CANCEL_INDEX = 1;

    ActionSheetIOS.showActionSheetWithOptions({
      message: '您想要保存图片到相册吗？',
      options: BUTTONS,
      destructiveButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
        if(buttonIndex == 0)
        {
          // 保存照片到相册
          var promise = CameraRoll.saveToCameraRoll(img);
          promise.then(function(result) {
            alert('保存成功！');
          }).catch(function(error) {
            alert('保存失败！');
          });
        }
    });
    return;
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgList: props.photos,
      showViewer: true,
      showIndex: 0
    }
    this.viewerPressHandle = this.viewerPressHandle.bind(this)
    this.thumbPressHandle = this.thumbPressHandle.bind(this)
    this.hiden = this.hiden.bind(this)
  }

  viewerPressHandle () {
    this.setState({
      showViewer: false
    })
  }

  thumbPressHandle (i) {
    this.setState({
      showIndex: i,
      showViewer: true
    })
  }

  hiden(){
    if(this.props.hiden){
         this.props.hiden();   
    }
  }

  render () {
    return (
      <View style={{position: 'relative'}}>
      {this.state.showViewer && <Viewer
        index={this.state.showIndex}
        pressHandle={this.viewerPressHandle}
        hiden={this.hiden}
        imgList={this.state.imgList} />}

      <View style={styles.thumbWrap}>
        {
          this.state.imgList.map((item, i) => <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
            <Image style={styles.thumb} source={{uri: item}} />
          </TouchableOpacity>)
        }
      </View>
    </View>)
  }
}
