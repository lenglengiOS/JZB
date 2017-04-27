//
//  LHLConversationViewController.m
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/4/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LHLConversationViewController.h"

@interface LHLConversationViewController ()

@end

@implementation LHLConversationViewController

- (void)viewDidLoad {
  
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault animated:YES];
  [super viewDidLoad];
  self.view.frame = CGRectMake(0, 100, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height-100);
  self.view.backgroundColor = [UIColor whiteColor];
  // Do any additional setup after loading the view.

  UIView *navView = [[UIView alloc] initWithFrame:CGRectMake(0, 20, [UIScreen mainScreen].bounds.size.width, 44)];
  navView.backgroundColor = [UIColor whiteColor];
  [self.view addSubview:navView];
  super.targetId = self.targetId;
  
  UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
  button.frame = CGRectMake(0, 22, 40, 40);
  [button setImage:[UIImage imageNamed:@"back"] forState:UIControlStateNormal];
  [button setImage:[UIImage imageNamed:@"back"] forState:UIControlStateHighlighted];
  [button addTarget:self action:@selector(dismissVC) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:button];
  
  UILabel *title = [[UILabel alloc] init];
  title.frame = CGRectMake(0, 0, 300, 44);
  title.textAlignment = NSTextAlignmentCenter;
  title.text = self.title;
  [title setFont:[UIFont systemFontOfSize:18.0]];
  title.textColor = [UIColor colorWithRed:0.27 green:0.75 blue:0.70 alpha:1.00];
  title.center = CGPointMake(CGRectGetMidX(navView.frame), CGRectGetMidY(navView.frame));
  [self.view addSubview:title];
  
}

- (void)dismissVC{
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent animated:YES];
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
