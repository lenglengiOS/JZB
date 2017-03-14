const React = require('react');
const ReactNative = require('react-native');
import {Size,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console} from '../constStr';
import SysMsg from '../home/sysMsg.js';
const {
  StyleSheet,
  Text,
  View,
  Animated,
} = ReactNative;
const Button = require('./Button');

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: '#FFF',
      inactiveTextColor: '#E9E7E8',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <Button
      style={{}}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  },

  gotoChat(){
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
            name: 'sysmsg',
            component: SysMsg,
            params:{
                title:'聊天记录'
            }
        })
    }
  },

  render() {
    const containerWidth = 147;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: 45,
      height: 3,
      backgroundColor: '#FFF',
      bottom: 2,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [2,  containerWidth / numberOfTabs, ],
    });
    return (
      <View style={{width:screenWidth, alignItems:'center', backgroundColor:'#48B9A9'}}>
        <View style={[styles.tabs, {backgroundColor: '#48B9A9', }, this.props.style, {width:120}]}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
          <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
        </View>
        <Text style={{color:'#FFF', fontSize:16, position:'absolute', right:13, bottom:15}} onPress={()=>this.gotoChat()}>聊天</Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  tabs: {
    height: 64,
    paddingTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});

module.exports = DefaultTabBar;