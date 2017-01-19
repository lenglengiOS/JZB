//
//  RNIOSAlert.m
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/1/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NativeTools.h"

@implementation NativeTools

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(doSomething:(RCTResponseSenderBlock)callback)
{
  NSArray *events = [NSArray arrayWithObjects:@"111", @"222", nil];
  callback(@[[NSNull null], events]);

}

@end
