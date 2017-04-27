//
//  RNIOSAlert.m
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/1/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NativeTools.h"
#import <BmobSDK/Bmob.h>
#import <SMS_SDK/SMSSDK.h>
#import "LHLMapViewController.h"
#import <RongIMKit/RongIMKit.h>
#import "LHLConversationViewController.h"

@implementation NativeTools

RCT_EXPORT_MODULE();
/**
 * 插件名-initPush
 */
RCT_EXPORT_METHOD(initPush)
{
  NSLog(@"initPush");
}

// 注册
RCT_EXPORT_METHOD(registerUSer:(NSString *)aUsername phoneNum:(NSString *)aPhoneNum pwd:(NSString *)aPwd callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"username:%@, phone:%@, pwd:%@", aUsername, aPhoneNum, aPwd);
  BmobObject *user = [BmobObject objectWithClassName:@"user"];
  [user setObject:aUsername forKey:@"username"];
  [user setObject:aPhoneNum forKey:@"phoneNum"];
  [user setObject:aPwd forKey:@"password"];
  [user saveInBackgroundWithResultBlock:^(BOOL isSuccessful, NSError *error) {
    //进行操作
    if (isSuccessful) {
      NSArray *events = [NSArray arrayWithObjects:@"注册成功", nil];
      callback(@[[NSNull null], events]);
    }else{
      NSLog(@"%@", error);
      NSArray *events = [NSArray arrayWithObjects:@"手机号已被注册", nil];
      callback(@[[NSNull null], events]);
    }
  }];
}

// 获取验证码
RCT_EXPORT_METHOD(getVerificationCode:(NSString *)aPhoneNum callback:(RCTResponseSenderBlock)callback)
{
  [SMSSDK getVerificationCodeByMethod:SMSGetCodeMethodSMS phoneNumber:aPhoneNum
                                 zone:@"86"
                     customIdentifier:nil
                               result:^(NSError *error){
                                 if (!error) {
                                   NSLog(@"获取验证码成功");
                                   NSArray *events = [NSArray arrayWithObjects:@"获取验证码成功", nil];
                                   callback(@[[NSNull null], events]);
                                 } else {
                                   NSLog(@"错误信息：%@",error);
                                   NSArray *events = [NSArray arrayWithObjects:@"操作失败", nil];
                                   callback(@[[NSNull null], events]);
                                 }}];
}

// 提交验证码
RCT_EXPORT_METHOD(commitVerificationCode:(NSString *)code pohmeNum:(NSString *)aPhoneNum callback:(RCTResponseSenderBlock)callback)
{
  [SMSSDK commitVerificationCode:code phoneNumber:aPhoneNum zone:@"86" result:^(SMSSDKUserInfo *userInfo, NSError *error) {
    
    {
      if (!error)
      {
        NSLog(@"验证成功");
        NSArray *events = [NSArray arrayWithObjects:@"验证成功", nil];
        callback(@[[NSNull null], events]);
      }
      else
      {
        NSLog(@"错误信息:%@",error);
        NSLog(@"验证失败");
        NSArray *events = [NSArray arrayWithObjects:@"验证失败", nil];
        callback(@[[NSNull null], events]);
      }
    }
  }];
}

// 获取用户信息
RCT_EXPORT_METHOD(getUserInfo:(NSString *)phoneNum callback:(RCTResponseSenderBlock)callback)
{
  BmobQuery *bquery = [BmobQuery queryWithClassName:@"user"];
  [bquery whereKey:@"phoneNum" equalTo:phoneNum];
  [bquery findObjectsInBackgroundWithBlock:^(NSArray *array, NSError *error) {
    if (error) {
      NSArray *events = [NSArray arrayWithObjects:@"获取用户失败", nil];
      callback(@[[NSNull null], events]);
    }else{
      for (BmobObject *obj in array) {
        //打印username
        BmobFile *file = (BmobFile*)[obj objectForKey:@"userIcon"];
        //        NSLog(@"username = %@", [obj objectForKey:@"username"]);
        //        NSLog(@"username = %@", file.url);
        NSArray *events = [NSArray arrayWithObjects:[obj objectForKey:@"username"], (NSString *)file.url, nil];
        callback(@[[NSNull null], events]);
      }
    }
  }];
}

// 获取推荐新闻
RCT_EXPORT_METHOD(getRecomNews:(RCTResponseSenderBlock)callback)
{
  BmobQuery *bquery = [BmobQuery queryWithClassName:@"recomNews"];
  [bquery findObjectsInBackgroundWithBlock:^(NSArray *array, NSError *error) {
    if (error) {
      NSArray *events = [NSArray arrayWithObjects:@"获取推荐新闻失败", nil];
      callback(@[[NSNull null], events]);
    }else{
      NSMutableArray *events = [NSMutableArray array];
      for (BmobObject *obj in array) {
        //打印username
        BmobFile *file = (BmobFile*)[obj objectForKey:@"icon"];
//        NSLog(@"typeName = %@", [obj objectForKey:@"typeName"]);
//        NSLog(@"pageUrl = %@", [obj objectForKey:@"url"]);
//        NSLog(@"title = %@", [obj objectForKey:@"title"]);
//        NSLog(@"icon = %@", file.url);
//        NSLog(@"************************************");
        NSDictionary *dict = @{
                               @"typeName":[obj objectForKey:@"typeName"],
                               @"pageUrl":[obj objectForKey:@"url"],
                               @"title":[obj objectForKey:@"title"],
                               @"icon":file.url,
                               };
        [events addObject:dict];
      }
//      NSLog(@"events = %@", events);
      callback(@[[NSNull null], events]);
    }
  }];
}

// 检测是否安装百度地图
RCT_EXPORT_METHOD(checkBaiduMap:(RCTResponseSenderBlock)callback)
{     
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"baidumap://"]]) {
    NSArray *events = [NSArray arrayWithObjects:@"已安装", nil];
    callback(@[[NSNull null], events]);
  }else{
    NSArray *events = [NSArray arrayWithObjects:@"未安装", nil];
    callback(@[[NSNull null], events]);
  }
  
}

// 跳转到苹果自带地图
//货运物流-城市选择
RCT_EXPORT_METHOD(getLHLMap)
{
  //do smothing
  LHLMapViewController *controller = [[LHLMapViewController alloc] init];
  UIViewController *rootViewController = [self getCurrentVC];
  [rootViewController presentViewController:controller animated:YES completion:NULL];
}

// 连接融云服务器
RCT_EXPORT_METHOD(connectWithToken:(NSString *)token callback:(RCTResponseSenderBlock)callback)
{
  [[RCIM sharedRCIM] connectWithToken:token     success:^(NSString *userId) {
    NSLog(@"登陆成功。当前登录的用户ID：%@", userId);
    NSArray *events = [NSArray arrayWithObjects:@"登陆成功", nil];
    callback(@[[NSNull null], events]);
  } error:^(RCConnectErrorCode status) {
    NSLog(@"登陆的错误码为:%ld", (long)status);
    NSArray *events = [NSArray arrayWithObjects:@"登陆失败", nil];
    callback(@[[NSNull null], events]);
  } tokenIncorrect:^{
    //token过期或者不正确。
    //如果设置了token有效期并且token过期，请重新请求您的服务器获取新的token
    //如果没有设置token有效期却提示token错误，请检查您客户端和服务器的appkey是否匹配，还有检查您获取token的流程。
    NSLog(@"token错误");
    NSArray *events = [NSArray arrayWithObjects:@"token失效", nil];
    callback(@[[NSNull null], events]);
  }];
}

//单聊
RCT_EXPORT_METHOD(singleChat:(NSString *)title)
{
  //do smothing
  dispatch_sync(dispatch_get_main_queue(), ^{
    //主线程更新
    LHLConversationViewController *conversationVC = [[LHLConversationViewController alloc]init];
    conversationVC.conversationType = 1;
    conversationVC.targetId = @"18428309335";
    conversationVC.title = title;
    UIViewController *rootViewController = [self getCurrentVC];
    [rootViewController presentViewController:conversationVC animated:YES completion:NULL];
    
  });
  
}


//获取当前View
- (UIViewController *)getCurrentVC
{
  UIViewController *result = nil;
  
  UIWindow * window = [[UIApplication sharedApplication] keyWindow];
  if (window.windowLevel != UIWindowLevelNormal)
  {
    NSArray *windows = [[UIApplication sharedApplication] windows];
    for(UIWindow * tmpWin in windows)
    {
      if (tmpWin.windowLevel == UIWindowLevelNormal)
      {
        window = tmpWin;
        break;
      }
    }
  }
  
  UIView *frontView = [[window subviews] objectAtIndex:0];
  id nextResponder = [frontView nextResponder];
  
  if ([nextResponder isKindOfClass:[UIViewController class]])
    result = nextResponder;
  else
    result = window.rootViewController;
  
  return result;
}




@end









