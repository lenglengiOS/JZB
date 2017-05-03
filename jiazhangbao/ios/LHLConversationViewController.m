//
//  LHLConversationViewController.m
//  jiazhangbao
//
//  Created by 冷洪林 on 2017/4/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LHLConversationViewController.h"
#import <CoreLocation/CoreLocation.h>

@interface LHLConversationViewController ()<UIImagePickerControllerDelegate, UINavigationControllerDelegate,CLLocationManagerDelegate>
@property (nonatomic, strong) CLLocationManager* locationManager;
@property (nonatomic, assign) CLLocationCoordinate2D coordinate;
@property (nonatomic, strong) NSString * location;
@end

@implementation LHLConversationViewController

- (void)viewDidLoad {
  
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault animated:YES];
  [super viewDidLoad];
  [self initializeLocationService];
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

- (void)pluginBoardView:(RCPluginBoardView *)pluginBoardView clickedItemWithTag:(NSInteger)tag{
  NSLog(@"%ld", (long)tag);
  long TAG = tag-1000;
  switch (TAG) {
    case 1:
      [self sendPhotos];
      break;
    case 2:
      [self openCamera];
      break;
    case 3:
      [self sendLocation];
      break;
    default:
      break;
  }
}

- (void)sendPhotos{
  /*!
   初始化图片消息
   
   @param image   原始图片
   @return        图片消息对象
   */
  // 1.判断相册是否可以打开
  if (![UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypePhotoLibrary]) return;
  // 2. 创建图片选择控制器
  UIImagePickerController *ipc = [[UIImagePickerController alloc] init];
  /**
   typedef NS_ENUM(NSInteger, UIImagePickerControllerSourceType) {
   UIImagePickerControllerSourceTypePhotoLibrary, // 相册
   UIImagePickerControllerSourceTypeCamera, // 用相机拍摄获取
   UIImagePickerControllerSourceTypeSavedPhotosAlbum // 相簿
   }
   */
  // 3. 设置打开照片相册类型(显示所有相簿)
  ipc.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  // ipc.sourceType = UIImagePickerControllerSourceTypeSavedPhotosAlbum;
  // 照相机
  // ipc.sourceType = UIImagePickerControllerSourceTypeCamera;
  // 4.设置代理
  ipc.delegate = self;
  // 5.modal出这个控制器
  [self presentViewController:ipc animated:YES completion:nil];
}

// 获取图片后的操作
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info
{
  // 销毁控制器
  [picker dismissViewControllerAnimated:YES completion:nil];
  
  // 设置图片
  RCImageMessage *imageMessage = [RCImageMessage messageWithImage:info[UIImagePickerControllerOriginalImage]];
  [self sendMediaMessage:imageMessage pushContent:nil appUpload:NO];
}

- (void)openCamera{
  // 1.判断相册是否可以打开
  if (![UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypePhotoLibrary]) return;
  // 2. 创建图片选择控制器
  UIImagePickerController *ipc = [[UIImagePickerController alloc] init];
  /**
   typedef NS_ENUM(NSInteger, UIImagePickerControllerSourceType) {
   UIImagePickerControllerSourceTypePhotoLibrary, // 相册
   UIImagePickerControllerSourceTypeCamera, // 用相机拍摄获取
   UIImagePickerControllerSourceTypeSavedPhotosAlbum // 相簿
   }
   */
  // 3. 设置打开照片相册类型(显示所有相簿)
  ipc.sourceType = UIImagePickerControllerSourceTypeCamera;
  // ipc.sourceType = UIImagePickerControllerSourceTypeSavedPhotosAlbum;
  // 照相机
  // ipc.sourceType = UIImagePickerControllerSourceTypeCamera;
  // 4.设置代理
  ipc.delegate = self;
  // 5.modal出这个控制器
  [self presentViewController:ipc animated:YES completion:nil];

}
- (void)sendLocation{
  /*!
   初始化地理位置消息
   
   @param image 地理位置的缩略图
   @param location 地理位置的二维坐标
   @param locationName 地理位置的名称
   @return 地理位置消息的对象
   */
  
  UIImage *image = [UIImage imageNamed:@"sendLocation.png"];
  RCLocationMessage *locationMessage = [RCLocationMessage messageWithLocationImage:image location:self.coordinate locationName:self.location];
  [self sendMessage:locationMessage pushContent:nil];
  
}

- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation
{
  self.coordinate = newLocation.coordinate;

  // 获取当前所在的城市名
  CLGeocoder *geocoder = [[CLGeocoder alloc] init];
  //根据经纬度反向地理编译出地址信息
  [geocoder reverseGeocodeLocation:newLocation completionHandler:^(NSArray *array, NSError *error){
    if (array.count > 0){
      CLPlacemark *placemark = [array objectAtIndex:0];
      //将获得的所有信息显示到label上
      NSString *str = [NSString string];
      str = [str stringByAppendingFormat:@"%@%@%@%@", placemark.administrativeArea, placemark.locality, placemark.subLocality, placemark.name];
      self.location = str;
//      NSLog(@"地址信息为：%@", str);
      //获取城市
      NSString *city = placemark.locality;
      if (!city) {
        //四大直辖市的城市信息无法通过locality获得，只能通过获取省份的方法来获得（如果city为空，则可知为直辖市）
        city = placemark.administrativeArea;
      }
//      NSLog(@"城市为： %@", city);
    }
    else if (error == nil && [array count] == 0)
    {
//      NSLog(@"No results were returned.");
    }
    else if (error != nil)
    {
//      NSLog(@"An error occurred = %@", error);
    }
	 }];
  //系统会一直更新数据，直到选择停止更新，因为我们只需要获得一次经纬度即可，所以获取之后就停止更新
  [manager stopUpdatingLocation];
}

- (void)initializeLocationService {
  // 初始化定位管理器
  _locationManager = [[CLLocationManager alloc] init];
  // 设置代理
  _locationManager.delegate = self;
  // 设置定位精确度到米
  _locationManager.desiredAccuracy = kCLLocationAccuracyBest;
  // 设置过滤器为无
  _locationManager.distanceFilter = kCLDistanceFilterNone;
  // 开始定位
  [_locationManager startUpdatingLocation];
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
