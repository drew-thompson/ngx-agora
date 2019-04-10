import { InjectStreamConfig } from './inject-stream-config.model';

export interface AgoraClient {
  aesMode: string;
  aespassword: string;
  /**
   * Injects an Online Media Stream to a Live Broadcast
   * @param url URL address of the live streaming. ASCII characters only, and the string length must be greater
   * than 0 and less than 256 bytes. Valid protocols are RTMP, HLS, and FLV.
   *  - Supported FLV audio codec type: AAC.
   *  - Supported FLV video codec type: H.264 (AVC).
   *
   * @param config Configuration of the inject stream
   * @see [InjectStreamConfig](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.injectstreamconfig.html)
   * @description
   * The streamInjectedStatus callback returns the inject status.If this method
   * is called successfully, the server pulls the voice or video stream and injects
   * it into a live channel. This is applicable to scenarios where all of the audience
   * members in the channel can watch a live show and interact with each other.
   */
  addInjectStreamUrl: (url: string, config: InjectStreamConfig) => void;
  /**
   * Configures the CDN Live Streaming
   *
   * @deprecated Agora recommends using the following methods instead:
   *  - [startLiveStreaming](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startlivestreaming)
   *  - [setLiveTranscoding](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#setlivetranscoding)
   *  - [stopLiveStreaming](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#stoplivestreaming)
   * @description
   * This method configures the CDN live streaming before joining a channel.
   * Call [configPublisher](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#configpublisher) before
   * [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   * @example
   * client.configPublisher({
   *  width: 360,
   *  height: 640,
   *  framerate: 30,
   *  bitrate: 500,
   *  publishUrl: "rtmp://xxx/xxx/"
   * });
   */
  configPublisher: (width: number, height: number, framerate: number, bitrate: number, publisherUrl: string) => void;
  disableDualStream: (onSuccess?: () => any, onFailure?: (error: Error) => any) => void;
  enableAudioVolumeIndicator: () => void;
  enableDualStream: (onSuccess?: () => any, onFailure?: (error: Error) => any) => void;
  getCameras: (callback: (devices: MediaDeviceInfo[]) => any) => void;
  getConnectionState: () => string;
  gatewayClient: {}; // add object
  highStream: any; // ? type
  highStreamState: number;
  init: any; // function
  isDualStream: boolean;
  join: any; // function
  key: any; // ? string
  leave: any; // function
  lowStream: any; // ?
  lowStreamParameter: any; // ?
  lowStreamState: number;
  on: any; // function
  proxyServer: any; // ?
  publish: any; // function
  renewChannelKey: any; // function
  setEncryptionMode: any; // function
  setEncryptionSecret: any; // function
  setLiveTranscoding: any; // function
  setLowStreamParameter: any; // function
  setProxyServer: any; // function
  setRemoteVideoStreamType: any; // function
  setTurnServer: any; // function
  startLiveStreaming: any; // function
  stopLiveStreaming: any; // function
  subscribe: any; // function
  turnServer: any; // function
  unpublish: any; // function
  unsubscribe: any; // function
}
