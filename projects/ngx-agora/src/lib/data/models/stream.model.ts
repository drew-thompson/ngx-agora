export interface Stream {
  addEventListener: any; // function
  audio: boolean;
  audioEnabled: boolean;
  audioLevelHelper: any; // ?
  aux_stream: any; // ?
  close: any; // function
  disableAudio: any; // function
  disableVideo: any; // function
  dispatchEvent: any; // function
  dispatchSocketEvent: any; // function
  dispatcher: any; // event listener
  enableAudio: any; // function
  enableVideo: any; // function
  getAttributes: any; // function
  getAudioLevel: any; // function
  getId: any; // function
  getStats: any; // function
  hasAudio: any; // function
  hasScreen: any; // function
  hasVideo: any; // function
  init: any; // function
  initialized: boolean;
  isAudioOn: any; // function
  isVideoOn: any; // function
  local: boolean;
  lowStream: any; // ?
  mirror: boolean;
  muteAudio: any; // ?
  muteVideo: any; // ?
  on: any; // function
  onClose: any; // ?
  params: { streamID: number; audio: boolean; cameraId: string; microphoneId: string; video: boolean };
  play: any; // function
  player: any; // ?
  removeEventListener: any; // function
  screen: boolean;
  screenAttributes: { width: number; height: number; maxFr: number; minFr: number };
  setScreenProfile: any; // function
  setVideoBitRate: any; // function
  setVideoFrameRate: any; // function
  setVideoProfile: any; // function
  setVideoProfileCustom: any; // function
  setVideoProfileCustomPlus: any; // function
  setVideoResolution: any; // function
  stop: any; // function
  streamLanyl; // ?
  streamId: number;
  unmuteAudio: any; // ?
  unmuteVideo: any; // ?
  url: any; // ?
  video: boolean;
  videoEnabled: boolean;
  videoHeight: number;
  videoSize: Array<number>;
  videoWidth: number;
}
