import React, { Platform } from 'react-native';

let AudioManager = null;
if (Platform.OS === 'ios') {
  AudioManager = require('NativeModules').AudioManager;
} else {
  /*
  AudioManager = require('react-native-android-audio-streaming-aac');
  AudioManager.setURLStreaming('http://lacavewebradio.chickenkiller.com:8000/stream.mp3');
  */
}

export class AudioPlayer {
  static start() {
    AudioPlayer.play();
  }

  static play() {
    console.log('playing audio ...');
    AudioManager.play();
  }

  static stop() {
    console.log('stopping audio ...');
    AudioManager.stop();
  }

  static pause() {
    console.log('pausing audio ...');
    AudioManager.pause();
  }

  static resume() {
    console.log('resuming audio ...');
    AudioManager.resume();
  }

  static getStatus(callback) {
    console.log('getting status ...');
    if (Platform.OS === 'ios') {
      if (callback && typeof callback === 'function') {
        return AudioManager.getStatus(callback);
      }
    }
  }
}
