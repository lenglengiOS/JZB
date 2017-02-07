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




@end









