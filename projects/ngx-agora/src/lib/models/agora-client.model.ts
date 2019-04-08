export interface AgoraClient {
  aesMode: string;
  aespassword: string;
  configPublisher: any; // function
  disableDualStream: any; // function
  enableDualStream: any; // function
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
