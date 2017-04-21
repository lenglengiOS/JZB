//
//  LHLMapViewController.m
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/4/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LHLMapViewController.h"
#import <MapKit/MapKit.h>

@interface LHLMapViewController () <MKMapViewDelegate>

@end

@implementation LHLMapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    dispatch_sync(dispatch_get_main_queue(), ^(){
      // 这里的代码会在主线程执行
      
      MKMapView *mapView =[[MKMapView alloc]init];
      
      mapView.frame =self.view.bounds;
      
      // 1.设置地图类型
      mapView.mapType = MKMapTypeStandard;
      
      // 2.设置跟踪模式(MKUserTrackingModeFollow == 跟踪)
      mapView.userTrackingMode = MKUserTrackingModeFollow;//这里也是定位功能实现的重要一步
      
      // 3.设置代理（监控地图的相关行为：比如显示的区域发生了改变）
      mapView.delegate = self;
      
      [self.view addSubview:mapView];
    });
  
    UIImage *backImg = [UIImage imageNamed:@"back.png"];
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    btn.frame = CGRectMake(0, 20, 40, 40);
    [btn setImage:backImg forState:UIControlStateNormal];
    [btn setImage:backImg forState:UIControlStateHighlighted];
    [btn addTarget:self action:@selector(popCurrentVC) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
}

- (void)popCurrentVC{
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
