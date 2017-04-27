//
//  LHLConversationViewController.h
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/4/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <RongIMKit/RongIMKit.h>

@interface LHLConversationViewController : RCConversationViewController

@property(nonatomic, strong) NSString *targetId;
@property(nonatomic, strong) NSString *title;

@end
