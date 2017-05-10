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
#import <RongIMKit/RongIMKit.h>
#import <UMSocialCore/UMSocialCore.h>

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
  
  // 融云
  [[RCIM sharedRCIM] initWithAppKey:@"c9kqb3rdcvrej"];
  
  // 友盟分享
  /* 打开调试日志 */
  [[UMSocialManager defaultManager] openLog:YES];
  
  /* 设置友盟appkey */
  [[UMSocialManager defaultManager] setUmSocialAppkey:@"590ab5fa8f4a9d2630000e85"];
  
  [self configUSharePlatforms];
  
  [self confitUShareSettings];

  
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

- (void)confitUShareSettings
{
  /*
   * 打开图片水印
   */
  [UMSocialGlobal shareInstance].isUsingWaterMark = YES;
  
  /*
   * 关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
   <key>NSAppTransportSecurity</key>
   <dict>
   <key>NSAllowsArbitraryLoads</key>
   <true/>
   </dict>
   */
  [UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
  
}

- (void)configUSharePlatforms
{
  /* 设置微信的appKey和appSecret */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx688b6cca795ff4eb" appSecret:@"52b17917768576236001904204f77dfa" redirectURL:@"https://appsto.re/cn/_mu5fb.i"];
  /*
   * 移除相应平台的分享，如微信收藏
   */
  //[[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];
  
  /* 设置分享到QQ互联的appID
   * U-Share SDK为了兼容大部分平台命名，统一用appKey和appSecret进行参数设置，而QQ平台仅需将appID作为U-Share的appKey参数传进即可。
   */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1106064217"/*设置QQ平台的appID*/  appSecret:nil redirectURL:@"https://appsto.re/cn/_mu5fb.i"];
  
  /* 设置新浪的appKey和appSecret */
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"861443194"  appSecret:@"b877f16e3654f5dcd06fe9819fccdab0" redirectURL:@"https://appsto.re/cn/_mu5fb.i"];
}

// 支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  if (!result) {
    // 其他如支付等SDK的回调
    NSLog(@"触发分享模块回调函数");
  }
  return result;
}

@end
