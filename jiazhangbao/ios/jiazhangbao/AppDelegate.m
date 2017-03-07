/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <BmobSDK/Bmob.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <SMS_SDK/SMSSDK.h>
#import "RCTBaiduMapViewManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Bmob后端云
  [Bmob registerWithAppKey:@"ee90961885f20d65680c306e517ddba7"];
  // Mod验证码
  [SMSSDK registerApp:@"1af4a3a0e0cb0"
           withSecret:@"f9bd59d14ace351395d38094eb029c04"];
  // 百度地图
  [RCTBaiduMapViewManager initSDK:@"Uzny2Z0UBOGuMgbBrD6GdQNsaPUycXhS"];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"jiazhangbao"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
