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

@implementation NativeTools

RCT_EXPORT_MODULE();
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



@end









