/**
 * 分享
 * Created by jinwangtong on 16/3/22.
 */
import Tools from '../tools';
import commenStyle from '../styles/basestyle';
import {Size,navheight,screenWidth,screenHeight,MainTabHeight,JZBImages,navbackground,lineColor,console} from '../constStr';
import Modal from 'react-native-modalbox';
import PluginList from '../plugins/PluginList'
import Toast from '../tools/Toast'
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    Dimensions,
    ListView,
    NativeModules
} from 'react-native';
var NativeTools = NativeModules.NativeTools;
var shareData;
var canshareList=[];
var shareList=[];
var shareUrl;
let qqshares=[{
            id: 'qq',
            img: <Image source={JZBImages.qq} style={{width:45, height:45}} />,
            title: 'QQ'
        }, {
            id: 'Qzone',
            img: <Image source={JZBImages.qqZone} style={{width:45, height:45}} />,
            title: 'QQ空间'
        }]
let wechatshare=[{
            id: 'wx',
            img: <Image source={JZBImages.wx} style={{width:45, height:45}} />,
            title: '微信好友'
        }, {
            id: 'wxline',
            img: <Image source={JZBImages.weixinTimeline} style={{width:45, height:45}} />,
            title: '微信朋友圈'
        }]
export default class ShareModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shareData: [],
            shareList: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
        }
    }

    show(){    
       this.doShow();
    }

    doShow(){
        shareList=[];
       if(Platform.OS==="ios"){
            this.checkInstalled();
        }else{
            //shareList.push(qqshares[0]);
            shareList=shareList.concat(qqshares);
            shareList=shareList.concat(wechatshare);
            this.setState({
                shareList: this.state.shareList.cloneWithRows(shareList)
             })
            this.refs.modal.open();
        } 
    }

    showShare(getShareUrl,operate){
        try{
            if(!getShareUrl&&operate){
                var getShare = Tools.filterArray(operate,{label: "label", value: "newshare"});
                getShareUrl = this.getArrayFirst(getShare).url;
            }
            Tools.getToken((token)=>{
                console.log("=======#######======="+getShareUrl+"/token/"+token)
                Tools.get(getShareUrl+"/token/"+token,(resData)=>{
                    shareData={
                        title:resData.title,
                        imageurl:resData.imgurl
                    }
                    shareUrl=resData.shareurl;
                    this.doShow();
                },(err)=>{
                    Toast.show("分享数据初始化失败");
                })
            })
        }catch(e){
            
        }
    }

    /*
    *检测是否安装QQ和微信
    */
     checkInstalled(){
            shareList=shareList.concat(qqshares);
            shareList=shareList.concat(wechatshare);
            this.setState({
                shareList: this.state.shareList.cloneWithRows(shareList)
            })
            this.refs.modal.open();

            //alert('检测是否安装QQ和微信')     
            
     }
     /**
     *Android端检测是佛安装微信
     */
     androidCheckWxInstall(){
        if(Platform.OS==="android"){
            Tools.checkQQAndWechatInstalled((code)=>{
                if(code<0){
                    Toast.show("请先安装微信")
                }
            })
        }
     }

    closeShareModal() {
        if(this.refs.modal){
          this.refs.modal.close();  
        }  
    }

    share(rowData) {
       // alert(this.state.shareData.title)
       var type="";
        switch (rowData.id) {
            case 'qq':
                type='QQ';
                break;
            case 'Qzone':
                type='Qzone';
                break;
            case 'wx':
                type='WechatSession';
                this.androidCheckWxInstall();
                break;
            case 'wxline':
                type='WechatTimeline';
                this.androidCheckWxInstall();  
                break;
                
        }

        NativeTools.checkQQAndWechatInstalled((result)=>{
            switch (type) {
                case 'QQ':
                    if(result.indexOf('QQ') != -1){
                        NativeTools.shareSNS(type)
                    }else{
                        Toast.show("请先安装QQ");
                    }
                    break;
                case 'Qzone':
                    if(result.indexOf('QQ') != -1){
                        NativeTools.shareSNS(type)
                    }else{
                        Toast.show("请先安装QQ");
                    }
                    break;
                case 'WechatSession':
                    if(result.indexOf('Wechat') != -1){
                        NativeTools.shareSNS(type)
                    }else{
                        Toast.show("请先安装微信");
                    }
                    break;
                case 'WechatTimeline':
                    if(result.indexOf('Wechat') != -1){
                        NativeTools.shareSNS(type)
                    }else{
                        Toast.show("请先安装微信");
                    }
                    break;
            }     
        })      


        
        //alert(type)

        //this.closeShareModal();
    }
    getArrayFirst(data) {
        if (data && data.length > 0) {
            return data[0];
        }
        return '';
    }


    renderRow(rowData, i) {
        return (
            <TouchableOpacity onPress={() => this.share(rowData)} style={[styles.item,{width:(screenWidth-20)/4}]}>
                {rowData.img}
                <Text style={[styles.itemText,commenStyle.font14]}>{rowData.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Modal style={styles.modal} position={"bottom"} ref={"modal"}>
                <View style={styles.innercontainer}>
                    <View style={styles.content}>
                        <ListView
                            dataSource={this.state.shareList}
                            renderRow={this.renderRow.bind(this)}
                            contentContainerStyle={styles.list}
                            removeClippedSubviews={false}/>

                    </View>
                    <View style={{width:screenWidth, height:1, backgroundColor:'#E8E8E8'}}/>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.closeShareModal()} style={styles.closebtn}>
                        <Text style={[{color:'black'},commenStyle.font14]}>{'取消'}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
   

}
let closeBtnHeight = 40;
let modalHeight = 160
var styles = StyleSheet.create({
    modal: {
        height: modalHeight
    },
    innercontainer: {
        flex: 1,
        height: modalHeight,
    },
    content: {
        padding: 10,
        height: modalHeight - closeBtnHeight,
        paddingTop:15
    },
    closebtn: {
        flexDirection: 'column',
        width: screenWidth,
        backgroundColor: "#FFF",
        padding: 10,
        height: closeBtnHeight,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:closeBtnHeight/3
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareImg: {
        margin: 10,
        width: 50,
        height: 50,

    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (screenWidth - 20) / 4,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 12,
        marginTop:5
    }
})