/**
 * Events that the Agora.io SDK `client.on()` function recognizes.
 *
 * If the API changes faster than the library, a quick type override can help bypass compiler errors:
 *
 * @example
 * this.ngxAgoraService.client.on('new-event' as ClientEvent, (data) => {})
 */
export enum ClientEvent {
  /**
   * Occurs when the first remote audio frame is decoded.
   * The SDK triggers this callback when the local client successfully subscribes to a remote stream and decodes the first audio frame.
   *
   * @example
   * client.on('first-audio-frame-decode', function (evt) {
   *  console.log('first-audio-frame-decode');
   *  console.log(evt.stream);
   * })
   */
  FirstAudioFrameDecoded = 'first-audio-frame-decode',
  /**
   * Occurs when the first remote video frame is decoded.
   * The SDK triggers this callback when the local client successfully subscribes to a remote stream and decodes the first video frame.
   *
   * @example
   * client.on('first-video-frame-decode', function (evt) {
   *  console.log('first-video-frame-decode');
   *  console.log(evt.stream);
   * })
   */
  FirstVideoFrameDecoded = 'first-video-frame-decode',
  /**
   * Occurs when the local stream is published.
   *
   * @example
   * client.on("stream-published", function(evt) {
   *  console.log("local stream published");
   *  //……
   * })
   */
  LocalStreamPublished = 'stream-published',
  /**
   * Occurs when the remote stream is added.
   *
   * @remark
   * When the local user joins the channel, if other users are already in the channel,
   * the SDK also reports to the app on the existing remote streams.
   *
   * @example
   * client.on("stream-added", function(evt) {
   *  var stream = evt.stream;
   *  console.log("new stream added ", stream.getId());
   *  // Subscribe the stream.
   *  //……
   * })
   */
  RemoteStreamAdded = 'stream-added',
  /**
   * Occurs when the remote stream is removed; for example, a peer user calls
   * [Client.unpublish](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#unpublish).
   *
   * @example
   * client.on("stream-removed", function(evt) {
   *  var stream = evt.stream;
   *  console.log("remote stream was removed", stream.getId());
   *  //……
   * });
   */
  RemoteStreamRemoved = 'stream-removed',
  /**
   * Occurs when a user subscribes to a remote stream.
   *
   * @example
   * client.on("stream-subscribed", function(evt) {
   *  var stream = evt.stream;
   *  console.log("new stream subscribed ", stream.getId());
   *  // Play the stream.
   *  //……
   * })
   */
  RemoteStreamSubscribed = 'stream-subscribed',
  /**
   * Occurs when the peer user leaves the channel; for example, the peer user calls
   * [Client.leave](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#leave).
   */
  PeerLeave = 'peer-leave',
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
   * Occurs when the peer user mutes the audio.
   *
   * @example
   * client.on("mute-audio", function(evt) {
   *  var uid = evt.uid;
   *  console.log("mute audio:" + uid);
   *  //alert("mute audio:" + uid)
   * });
   */
  RemoteAudioMuted = 'mute-audio',
  /**
   * Occurs when the peer user unmutes the audio.
   *
   * @example
   * client.on("unmute-audio", function (evt) {
   *  var uid = evt.uid;
   *  console.log("unmute audio:" + uid);
   * });
   */
  RemoteAudioUnmuted = 'unmute-audio',
  /**
   * Occurs when the peer user turns off the video.
   *
   * @example
   * client.on("mute-video", function (evt) {
   *  var uid = evt.uid;
   *  console.log("mute video" + uid);
   *  //alert("mute video:" + uid);
   * })
   */
  RemoveVideoMuted = 'mute-video',
  /**
   * Occurs when the peer user turns on the video.
   *
   * @example
   * client.on("unmute-video", function (evt) {
   *  var uid = evt.uid;
   *  console.log("unmute video:" + uid);
   * })
   */
  RemoteVideoUnmuted = 'unmute-video',
  /**
   * Occurs when encryption or decryption fails during publishing or subscribing to a stream.
   * The failure is usually due to a wrong encryption password
   * ([setEncryptionSecret](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#setencryptionsecret))
   * or an incorrect encryption
   * mode ([setEncryptionMode](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#setencryptionmode)).
   *
   * @since 3.0.0
   */
  CryptError = 'crypt-error',
  /**
   * This callback notifies the peer user that he/she is banned from the channel. Only the banned users receive this callback.
   * Usually the reason is that the UID is banned (`K_UID_BANNED`(14)).
   *
   * @example
   * client.on("client-banned", function (evt) {
   *  var uid = evt.uid;
   *  var attr = evt.attr;
   *  console.log(" user banned:" + uid + ", bantype:" + attr);
   *  alert(" user banned:" + uid + ", bantype:" + attr);
   * });
   */
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
  /** Occurs when the live streaming starts. */
  LiveStreamingStarted = 'liveStreamingStarted',
  /** Occurs when the live streaming fails. */
  LiveStreamingFailed = 'liveStreamingFailed',
  /** Occurs when the live streaming stops. */
  LiveStreamingStopped = 'liveStreamingStopped',
  /**
   * Occurs when the live transcoding setting is updated.
   *
   * The SDK triggers this callback when the live transcoding setting is updated by calling the
   * [setLiveTranscoding](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#setlivetranscoding) method.
   *
   * @remark
   * The first call of the
   * [setLiveTranscoding](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#setlivetranscoding)
   * method does not trigger this callback.
   */
  LiveTranscodingUpdated = 'liveTranscodingUpdated',
  /** Occurs when the injected online media stream's status is updated. */
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
  /**
   * Occurs when an error message is reported and requires error handling.
   * For details, @see [Error Codes and Warning Codes](https://docs.agora.io/en/Video/the_error_web).
   */
  Error = 'error',
  /**
   * Occurs when the network type changes.
   *
   * @remark
   * Chrome 61+ is required for this function, and the compatibility is not guaranteed.
   *
   * @see [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) for details.
   */
  NetworkTypeChanged = 'network-type-changed',
  /**
   * Occurs when an audio input device is added or removed.
   *
   * @example
   * client.on("recording-device-changed", function(evt) {
   *  console.log("Recording Device Changed", evt.state, evt.device);
   * });
   */
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
  /**
   * Occurs when a remote stream adds or removes a track.
   *
   * When a remote stream calls the [addTrack](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.stream.html#addtrack)
   * or [removeTrack](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.stream.html#removetrack)
   * method, the SDK triggers this callback.
   */
  StreamUpdated = 'stream-updated',
  /**
   * Reports exception events in the channel.
   * Exceptions are not errors, but usually mean quality issues.
   * This callback also reports recovery from an exception.
   * Each exception event has a corresponding recovery event
   * @see https://web-cdn.agora.io/docs-files/1547180053430 for details
   */
  Exception = 'exception',
  /**
   * Occurs when a remote user of the Native SDK calls `enableLocalVideo(true)` to enable video capture.
   *
   * @since 3.0.0
   */
  RemoteVideoCaptureEnabled = 'enable-local-video',
  /**
   * Occurs when a remote user of the Native SDK calls `enableLocalVideo(false)` to disable video capture.
   *
   * @since 3.0.0
   */
  RemoteVideoCaptureDisabled = 'disable-local-video',
  /**
   * Reports events during the media stream relay.
   *
   * Parameters
   * - evt: `object`
   *  - code: `number`
   *  The event code for media stream relay.
   *    - 0: The user disconnects from the server due to a poor network connection.
   *    - 1: The user is connected to the server.
   *    - 2: The user joins the source channel.
   *    - 3: The user joins the destination channel.
   *    - 4: The SDK starts relaying the media stream to the destination channel.
   *    - 5: The server receives the video stream from the source channel.
   *    - 6: The server receives the audio stream from the source channel.
   *    - 7: The destination channel is updated.
   */
  MediaStreamEventRelayed = 'channel-media-relay-event',
  /**
   * Occurs when the state of the media stream relay changes.
   *
   * @since 3.0.0
   * @description
   * The SDK reports the state and error code of the current media relay in this callback.
   *
   * Parameters
   * - evt: `object`
   *  - code: `number`
   *  The error code.
   *    - 0: No error.
   *    - 1: An error occurs in the server response.
   *    - 2: No server response.
   *    - 3: The SDK fails to access the service, probably due to limited resources of the server.
   *    - 4: Fails to send the relay request.
   *    - 5: Fails to accept the relay request.
   *    - 6: The server fails to receive the media stream.
   *    - 7: The server fails to send the media stream.
   *    - 8: The SDK disconnects from the server and fails to reconnect to the server due to a poor network connection.
   *         In this case, the SDK resets the relay state. You can try
   *  [startChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   *         to restart the media stream relay.
   *    - 9: An internal error occurs in the server.
   *    - 10: The token of the source channel has expired.
   *    - 11: The token of the destination channel has expired.
   *    - 12: The relay has already started. Possibly caused by calling
   *  [startChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   *          repeatedly, or calling
   *  [startChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   *          before
   *  [stopChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#stopchannelmediarelay)
   *          succeeds.
   *    - 13: The relay has not started. Possibly caused by calling
   *  [updateChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#updatechannelmediarelay)
   *          before
   *  [startChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   *          succeeds.
   *
   *  - state: `number`
   *    The state code.
   *    - 0: The SDK is initializing.
   *    - 1: The SDK tries to relay the media stream to the destination channel.
   *    - 2: The SDK successfully relays the media stream to the destination channel.
   *    - 3: An error occurs. See `code` for the error code. In case of an error, the SDK resets the media stream relay state,
   *         and you need to call
   * [startChannelMediaRelay](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   *         to restart the relay.
   */
  MediaStreamRelayStateChanged = 'channel-media-relay-state',
}
