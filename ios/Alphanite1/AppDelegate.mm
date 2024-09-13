#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <Firebase.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Alphanite1";
  // You can add your custom initial props in the dictionary below.
  [FIRApp configure];
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [[FBSDKApplicationDelegate sharedInstance] application:application
                      didFinishLaunchingWithOptions:launchOptions];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
@end
