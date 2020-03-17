/**
 * Events that the Agora.io SDK `client.on()` function recognizes.
 *
 * If the API changes faster than the library, a quick type override can help bypass compiler errors:
 *
 * @example
 * this.ngxAgoraService.client.on('new-event' as ClientEvent, (data) => {})
 */
export enum ClientEvent {
  FirstAudioFrameDecode = 'first-audio-frame-decode',
  FirstVideoFrameDecode = 'first-video-frame-decode',
  LocalStreamPublished = 'stream-published',
  RemoteStreamAdded = 'stream-added',
  RemoteStreamRemoved = 'stream-removed',
  /** Occurs when a user subscribes to a remote stream. */
  RemoteStreamSubscribed = 'stream-subscribed',
  /**
   * Occurs when the peer user leaves the channel;for example, the peer user calls
   * [Client.leave](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#leave).
   */
  PeerLeave = 'peer-leave',
  RemoteAudioMuted = 'mute-audio',
  RemoteAudioUnmuted = 'unmute-audio',
  RemoveVideoMuted = 'mute-video',
  RemoteVideoUnmuted = 'unmute-video',
  /** Occurs when an error message is reported and requires error handling.
   * For details, @see [Error Codes and Warning Codes](https://docs.agora.io/en/Video/the_error_web).
   */
  Error = 'error',
  /** This callback notifies the peer user that he/she is banned from the channel. Only the banned users receive this callback. */
  LocalClientBanned = 'client-banned',
  /** This callback notifies the application who is the active speaker in the channel. */
  ActiveSpeaker = 'active-speaker',
  /**
   * This callback notifies the application of all the speaking remote users and their volumes.
   *
   * It is disabled by default. You can enable this event by calling enableAudioVolumeIndicator.
   * If enabled, it reports the volumes every two seconds regardless of whether there are users speaking.
   *
   * The volume is an integer ranging from 0 to 100. Usually a user with volume above five will be countedas a speaking user.
   */
  VolumeIndicator = 'volume-indicator',
  LiveStreamingStarted = 'liveStreamingStarted',
  LiveStreamingFailed = 'liveStreamingFailed',
  LiveStreamingStopped = 'liveStreamingStopped',
  /** Occurs when the live transcoding setting is updated. */
  LiveTranscodingUpdated = 'liveTranscodingUpdated',
  StreamInjectedStatusUpdated = 'streamInjectedStatus',
  /**
   * Occurs when the Token expires in 30 seconds.
   *
   * You should request a new Token from your server and call
   * [Client.renewToken](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#renewtoken).
   */
  TokenPrivelegeWillExpire = 'onTokenPrivilegeWillExpire',
  /**
   * Occurs when the Token expires.
   *
   * You should request a new Token from your server and call
   * [Client.renewToken](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#renewtoken).
   */
  TokenPrivelegeExpired = 'onTokenPrivilegeDidExpire',
  NetworkTypeChanged = 'network-type-changed',
  RecordingDeviceChanged = 'recording-device-changed',
  /**
   * Occurs when an audio output device is added or removed.
   * @remark
   * Only supports Chrome 49+.
   */
  AudioOutputDeviceChanged = 'playout-device-changed',
  /** Occurs when a camera is added or removed. */
  CameraChanged = 'camera-changed',
  /**
   * Occurs when the type of a video stream changes.
   * It happens when a high-video stream changes to a low-video stream, or vice versa.
   *
   * The stream type (streamType):
   * - 0: High-bitrate, high-resolution video stream.
   * - 1: Low-bitrate, low-resolution video stream.
   */
  StreamTypeChanged = 'stream-type-changed',
  /**
   * Occurs when the network connection state changes.
   *
   * The connection between the SDK and Agora's edge server has the following states:
   *
   * - DISCONNECTED: The SDK is disconnected from Agora's edge server.
   *   This is the initial state before Client.join.
   *   The SDK also enters this state after the app calls Client.leave.
   * - CONNECTING: The SDK is connecting to Agora's edge server. The SDK enters this state when calling Client.join or
   *   reconnecting to Agora's edge server automatically after the connection is lost.
   * - CONNECTED: The SDK is connected to Agora's edge server and joins a channel. You can now publish or subscribe to a stream
   *   in the channel. If the connection is lost because, for example, the network is down or switched, the SDK triggers this callback
   *   and notifies the app that the state changes from CONNECTED to CONNECTING.
   * - DISCONNECTING: The SDK is disconnecting from Agora's edge server. The SDK enters this state when calling Client.leave.
   */
  ConnectionStateChanged = 'connection-state-change',
  /** Occurs when the SDK starts republishing or re-subscribing to a stream. */
  StreamReconnectionStart = 'stream-reconnect-start',
  /** Occurs when the SDK finishes republishing or re-subscribing to a stream. */
  StreamReconnectionEnd = 'stream-reconnect-end',
  /** Occurs when the user role switches in a live broadcast. For example, from a host to an audience or vice versa. */
  ClientRoleChanged = 'client-role-changed',
  /**
   * Occurs when a remote user or host joins the channel.
   * - Communication channel (rtc mode): This callback notifies the app that another user joins the channel.
   *   If other users are already in the channel, the SDK also reports to the app on the existing users.
   * - Live-broadcast channel (live mode): This callback notifies the app that the host joins the channel.
   *   If other hosts are already in the channel, the SDK also reports to the app on the existing hosts.
   *   Agora recommends limiting the number of hosts to 17.
   */
  PeerOnline = 'peer-online',
  /**
   * Reports the network quality of the local user once every two seconds.
   *
   * This callback reports on the uplink and downlink network conditions of the local user.
   *
   * @remark
   * This is an experimental feature and the network quality rating is for reference only.
   */
  NetworkQualityReported = 'network-quality',
  /**
   * Occurs when the remote video stream falls back to an audio-only stream due to unreliable network
   * conditions or switches back to the video after the network conditions improve.
   *
   * If you set `fallbackType` as 2 in
   * [setStreamFallbackOption](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#setstreamfallbackoption),
   * the SDK triggers this callback when the remote media stream falls back to audio only due to unreliable network conditions
   * or switches back to the video after the network condition improves.
   *
   * @remark
   * Once the remote media stream is switched to the low stream due to unreliable network conditions, you can monitor
   * the stream switch between a high stream and low stream in the stream-type-changed callback.
   */
  StreamFallback = 'stream-fallback',
  /** Occurs when a remote stream adds or removes a track. */
  StreamUpdated = 'stream-updated',
  /**
   * Reports exception events in the channel.
   * Exceptions are not errors, but usually mean quality issues.
   * This callback also reports recovery from an exception.
   * Each exception event has a corresponding recovery event
   * @see https://web-cdn.agora.io/docs-files/1547180053430 for details
   */
  Exception = 'exception'
}
