// AudioManager.h
// From https://github.com/jhabdas/lumpen-radio/blob/master/iOS/Classes/AudioManager.h

#import "RCTBridgeModule.h"
#import "STKAudioPlayer.h"

@interface AudioManager : NSObject <RCTBridgeModule, STKAudioPlayerDelegate>

@property (nonatomic, strong) STKAudioPlayer *audioPlayer;
@property (nonatomic, readwrite) BOOL isPlayingWithOthers;

- (void)play;
- (void)pause;

@end