//
//  RNIOSAlert.m
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/1/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NativeTools.h"
#import <BmobSDK/Bmob.h>

@implementation NativeTools

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(doSomething:(RCTResponseSenderBlock)callback)
{
  //查找GameScore表
  BmobQuery   *bquery = [BmobQuery queryWithClassName:@"GameScore"];
  //查找GameScore表里面id为0c6db13c的数据
  [bquery getObjectInBackgroundWithId:@"11f56cd0ec" block:^(BmobObject *object,NSError *error){
    if (error){
      //进行错误处理
    }else{
      //表里有id为0c6db13c的数据
      if (object) {
        //得到playerName和cheatMode
        NSString *playerName = [object objectForKey:@"playerName"];
        BOOL cheatMode = [[object objectForKey:@"cheatMode"] boolValue];
        NSLog(@"%@----%i",playerName,cheatMode);
        
        NSArray *events = [NSArray arrayWithObjects:@"666", playerName, nil];
        callback(@[[NSNull null], events]);
      }
    }
  }];
  

}

@end
