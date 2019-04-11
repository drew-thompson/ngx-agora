import { AgoraEvent } from '../enums/agora-event.enum';
import { ConnectionState } from '../types/connection-state.type';
import { InjectStreamConfig } from './inject-stream-config.model';
import { LiveTranscoding } from './live-transcoding.model';
import { LocalAudioStatsMap } from './local-audio-stats-map.model';
import { LocalVideoStatsMap } from './local-video-stats-map.model';
import { Stream } from './stream.model';
import { SubscribeOptions } from './subscribe-options.model';
import { TurnServer } from './turn-server.model';

/**
 * The Client object returned by the [createClient](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#createclient)
 * method provides access to much of the core AgoraRTC functionality.
 *
 * @see [Web Client](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html)
 */
export interface AgoraClient {
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
  /**
   * This method returns the state of the connection between the SDK and Agora's edge server.
   *
   * @description
   * The connection state:
   *  - DISCONNECTED: The SDK is disconnected from Agora's edge server.
   *    This is the initial state before
   *    [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   *    The SDK also enters this state after the app calls
   *    [Client.leave](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#leave).
   *  - CONNECTING: The SDK is connecting to Agora's edge server. The SDK enters this state when
   *    calling [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join)
   *    or reconnecting to Agora's edge server automatically after the connection is lost.
   *  - CONNECTED: The SDK is connected to Agora's edge server and joins a channel. You can now publish or
   *    subscribe to a stream in the channel.
   *  - DISCONNECTING: The SDK is disconnecting from Agora's edge server. The SDK enters this state when calling
   *    [Client.leave](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#leave).
   */
  getConnectionState: () => ConnectionState;
  /**
   * Retrieves the Audio Statistics of the Local Stream
   *
   * This method retrieves the audio statistics of the published stream,
   * including audio codec type, sampling rate, bitrate, and so on.
   *
   * @description
   *  - Some of the statistics are calculated after the stream-published event, which may take at most 3 seconds.
   * - This method supports the Chrome browser only.
   * @example
   * client.getLocalAudioStats((localAudioStats) => {
   *  Object.keys(localAudioStats).forEach(uid => {
   *   console.log(`Audio CodecType from ${uid}: ${localAudioStats[uid].CodecType}`);
   *   console.log(`Audio MuteState from ${uid}: ${localAudioStats[uid].MuteState}`);
   *   console.log(`Audio RecordingLevel from ${uid}: ${localAudioStats[uid].RecordingLevel}`);
   *   console.log(`Audio SamplingRate from ${uid}: ${localAudioStats[uid].SamplingRate}`);
   *   console.log(`Audio SendBitrate from ${uid}: ${localAudioStats[uid].SendBitrate}`);
   *   console.log(`Audio SendLevel from ${uid}: ${localAudioStats[uid].SendLevel}`);
   *  })
   * });
   */
  getLocalAudioStats: (callback: (stats: LocalAudioStatsMap) => any) => void;
  /**
   * Retrieves the Video Statistics of the Local Stream
   *
   * This method retrieves the video statistics of the published stream, including video resolution, bitrate, frame rate, and so on.
   *
   * @description
   * Some of the statistics are calculated after the stream-published event, which may take at most 3 seconds.
   * This method supports the Chrome browser only.
   */
  getLocalVideoStats: (callback: (stats: LocalVideoStatsMap) => any) => void;
  /**
   * Gets the Statistics of the System Network
   * @deprecated from v2.5.1, use getTransportStats instead.
   *
   * This method gets the statistics of the browser's local network.
   * Currently only the network type information is provided, see NetworkType.
   *
   * @description
   * Chrome 61+ is required for this function, and the compatibility is not guaranteed. See Network Information API for details.
   */
  getNetworkStats: (callback: (stats: any) => any) => void;
  /**
   * Enumerates Audio Output Devices
   *
   * This method enumerates the available audio output devices, such as speakers.
   * If this method succeeds, the SDK returns a list of audio output devices in an array of
   * [MediaDeviceInfo](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.mediadeviceinfo.html) objects.
   */
  getPlayoutDevices: (callback: (devices: MediaDeviceInfo[]) => any) => void;
  /**
   * Enumerates Audio Input Devices
   *
   * This method enumerates the available audio input devices, such as microphones.
   * If this method succeeds, the SDK returns a list of audio input devices in an array of MediaDeviceInfo objects.
   */
  getRecordingDevices: (callback: (devices: MediaDeviceInfo[]) => any) => void;
  /**
   * Retrieves the Audio Statistics of the Remote Stream
   * This method retrieves the audio statistics of the remote stream, including audio codec type, packet loss rate, bitrate, and so on.
   *
   * @description
   * The statistics are calculated after the `stream-subscribed` event, which may take at most 3 seconds.
   * This method supports the Chrome browser only.
   */
  getRemoteAudioStats: (callback: (stats: any) => any) => void;
  /**
   * Retrieves the Video Statistics of the Remote Stream
   * This method retrieves the video statistics of the remote stream, including packet loss rate, video bitrate, frame rate, and so on.
   *
   * @description
   * The statistics are calculated after the `stream-subscribed` event, which may take at most 3 seconds.
   * This method supports the Chrome browser only.
   */
  getRemoteVideoStats: (callback: (stats: any) => any) => void;
  /**
   * Gets the Statistics of the Session
   * This method gets the statistics of the session connection.
   *
   * @description
   * This method should be called after joining the channel, and it may take at most 3 seconds to retrieve the statistics.
   * This method supports the Chrome browser only.
   */
  getSessionStats: (callback: (stats: any) => any) => void;
  /**
   * Gets the Statistics of the System
   *
   * This method gets the statistics of the system.
   *
   * Currently only the battery level information is provided.
   * @see [BatteryLevel](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.systemstats.html#batterylevel).
   *
   * @description
   * This feature is experimental.
   * @see [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API) for browser compatibility.
   */
  getSystemStats: (callback: (stats: any) => any) => void;
  /**
   * Gets the Statistics of the Transmission
   * This method gets the statistics of the transmission quality to Agora service.
   *
   * @description
   * Calculation of the statistics may take at most 3 seconds.
   * This method supports the Chrome browser only.
   */
  getTransportStats: (callback: (stats: any) => any) => void;
  /**
   * Initializes a Client Object
   * This method initializes the client object.
   *
   * @param appId Pass in the App ID for your project.
   * ASCII characters only, and the string length must be greater than 0 and less than 256 bytes.
   * To get your App ID,
   * @see [Get an App ID](https://docs.agora.io/en/Video/web_prepare?platform=Web#create-an-agora-account-and-get-an-app-id).
   * @param [onSuccess] The callback when the method succeeds.
   * @param [onFailure] The callback when the method fails.
   *
   * @example
   * client.init(appId, function() {
   * console.log("client initialized");
   * // Join a channel
   * //……
   * }, function(err) {
   *     console.log("client init failed ", err);
   *     // Error handling
   * });
   */
  init: (appId: string, onSuccess?: () => void, onFailure?: (error: Error) => void) => void;
  /**
   * Joins an AgoraRTC Channel
   * This method joins an AgoraRTC channel.
   *
   * @description
   * All users in the same channel should have the same type (number or string) of uid.
   *  - If you use a number as the user ID, it should be a 32-bit unsigned integer with a value ranging from 0 to (232-1).
   *  - If you use a string as the user ID, the maximum length is 255 characters.
   *
   * @param tokenOrKey
   * - Low security requirements: Pass null as the parameter value.
   * - High security requirements: Pass the string of the Token or Channel Key as the parameter value. See Use Security Keys for details.
   * @param channel
   * A string that provides a unique channel name for the Agora session. The length must be within 64 bytes. Supported character scopes:
   * - 26 lowercase English letters a-z
   * - 26 uppercase English letters A-Z
   * - 10 numbers 0-9
   * - Space
   * - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param uid The user ID, an integer or a string, ASCII characters only. Ensure this ID is unique.
   * If you set the uid to null, the server assigns one and returns it in the onSuccess callback.
   * @param [onSuccess] The callback when the method succeeds. The server returns the uid which represents the identity of the user.
   * @param [onFailure] The callback when the method fails.
   * @example
   * client.join(<token>, "1024", null, uid => {
   *    console.log("client" + uid + "joined channel");
   *    // Create a local stream
   *    //……
   * }, err => {
   *    console.error("client join failed ", err);
   *    // Error handling
   * });
   *
   */
  join: (
    tokenOrKey: string | null,
    channel: string | null,
    uid: number | string | null,
    onSuccess?: (uid: number | string) => void,
    onFailure?: (error: Error) => void
  ) => void;
  /**
   * Leaves an AgoraRTC Channel
   *
   * This method enables a user to leave a channel.
   *
   * @param [onSuccess] The callback when the method succeeds.
   * @param [onFailure] The callback when the method fails.
   * @example
   * client.leave(_ => {
   *     console.log("client leaves channel");
   *     //……
   * }, err => {
   *     console.log("client leave failed ", err);
   *     //error handling
   * });
   */
  leave: (onSuccess?: () => void, onFailure?: (error: Error) => void) => void;
  /**
   * Occurs when an Agora.io event is received from the SDK.
   *
   * @see [On](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#on)
   * for all variations of this core function.
   */
  on: (event: AgoraEvent, callback: (evt: any) => void) => void;
  /**
   * Publishes a Local Stream
   * This method publishes a local stream to the SD-RTN.
   *
   * @description
   * In a live broadcast, whoever calls this API is the host.
   *
   * @param stream Stream object, which represents the local stream.
   * @param [onFailure] The callback when the method fails.
   * @example
   * client.publish(stream, err => {
   *    console.log(err);
   *    //……
   * })
   */
  publish: (stream: Stream, onFailure?: (error: Error) => void) => void;
  /**
   * Removes the Injected Stream
   *
   * This method removes the HTTP/HTTPS URL address (added by addInjectStreamUrl) from the live broadcast.
   *
   * @param url URL address of the live streaming. ASCII characters only, and the string
   * length must be greater that 0 and less than 256 bytes.
   */
  removeInjectStreamUrl: (url: string) => void;
  /**
   * This method renews your channel key.
   *
   * Once the Channel Key schema is enabled, the key expires after a certain period of time.
   * When the onFailure callback reports the error DYNAMIC_KEY_TIMEOUT, the application should renew the
   * Channel Key by calling this method. Not doing so will result in SDK disconnecting with the server.
   */
  renewChannelKey: (key: string, onSuccess?: () => void, onFailure?: (error: Error) => void) => void;
  /**
   * This method renews your token.
   *
   * Once the Token schema is enabled, the token expires after a certain period of time.
   * In case of the `onTokenPrivilegeWillExpire` or `onTokenPrivilegeDidExpire` callback events, the application
   * should renew the Token by calling this method. Not doing so will result in SDK disconnecting with the server.
   *
   * @param token Specifies the renewed Token.
   */
  renewToken: (token: string) => void;
  /**
   * Sets the role of the user.
   *
   * This method is applicable only to the live mode.
   * Sets the role of the user such as a host or an audience (default), before joining a channel.
   * This method can be used to switch the user role after the user joins a channel.
   *
   * In live mode ([mode](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html#mode) is set as live):
   * - Before joining the channel, you can call this method to set the role.
   * - After joining the channel, you can call this method to switch the role:
   *   When you call [publish](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#publish),
   *   the user role switches to host; when you call
   *   [unpublish](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#unpublish),
   *   the user role switches to audience.
   *   After calling [publish](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#publish),
   *   if you call this method and set the user role as audience,
   *   [unpublish](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#unpublish) is called automatically.
   *
   * In communication mode
   * ([mode](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html#mode) set as `rtc`),
   * this method does not take effect. All users are host by default.
   *
   * @param role User role in a live broadcast:
   * - "audience": Audience, the default role. An audience can only receive streams.
   * - "host": Host. A host can both send and receive streams.
   *
   * @example
   * client.setClientRole('host', _ => {
   *    console.log("setHost success");
   *  }, e => {
   *    console.log("setHost failed", e);
   *  })
   */
  setClientRole: (role: 'audience' | 'host', callback?: (error: Error) => void) => void;
  /**
   * This method sets the encryption mode.
   *
   * @description
   * Ensure that you call this API before
   * [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   *
   * @param encryptionMode
   * - aes-128-xts: Sets the encryption mode as AES128XTS.
   * - aes-256-xts: Sets the encryption mode as AES256XTS.
   * - aes-128-ecb: Sets the encryption mode as AES128ECB.
   */
  setEncryptionMode: (encryptionMode: 'aes-128-xts' | 'aes-256-xts' | 'aes-128-ecb') => void;
  /**
   * This method enables the built-in encryption.
   *
   * @description
   * Ensure that you call this API before
   * [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   *
   * @param password
   * - The encryption password. ASCII characters only, and the string length must be greater than 0 and less than 256 bytes.
   */
  setEncryptionSecret: (password: string) => void;
  /**
   * This method sets the video layout and audio for CDN live.
   *
   * @description
   * Call [setLiveTranscoding](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#setlivetranscoding)
   * after [createStream](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#createstream).
   * For details, see [Push Streams to the CDN](https://docs.agora.io/en/Video/push_stream_web).
   */
  setLiveTranscoding: (coding: LiveTranscoding) => void;
  /**
   * Sets the Low-video Stream Parameter
   *
   * If you enabled the dual-stream mode by calling
   * [Client.enableDualStream](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#enabledualstream),
   * use this method to set the low-video stream profile.
   * If you do not set the low-video stream profile, the SDK will assign default values based on your stream video profile.
   *
   * @description
   * - As different web browsers have different restrictions on the video profile, the parameters you set
   *   may fail to take effect. The Firefox browser has a fixed frame rate of 30 fps, therefore the frame
   *   rate settings do not work on the Firefox browser.
   * - Due to limitations of some devices and browsers, the resolution you set may fail to take effect and
   *   get adjusted by the browser. In this case, billings will be calculated based on the actual resolution.
   * - Call [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join) before using this method.
   * - Screen sharing supports the high-video stream only.
   *
   * @see [setLowStreamParameter](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#setlowstreamparameter)
   */
  setLowStreamParameter: (param: { bitrate?: number; framerate?: number; height?: number; width?: number }) => void;
  /**
   * Deploys the Nginx Server
   *
   * Use this method to deploy the Nginx server.
   *
   * @description
   * Ensure that you call this API before
   * [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   * Proxy services by different service providers may result in slow performance if you are using the Firefox browser.
   * Therefore, Agora recommends using the same service provider for the proxy services. If you use different service providers,
   * Agora recommends not using the Firefox browser.
   *
   * @param proxyServer Your Nginx server domain name. ASCII characters only, and the string length
   * must be greater than 0 and less than 256 bytes.
   */
  setProxyServer: (proxyServer: string) => void;
  /**
   * Sets the Remote Video-stream Type
   * When a remote user sends dual streams, this method decides on which stream to receive on the subscriber side.
   * If this method is not used, the subscriber receives the high-video stream.
   *
   * @description
   * As not all web browsers are compatible with dual streams, Agora does not recommend developers setting the
   * resolution of the low-video stream.
   *
   * Some web browsers may not be fully compatible with dual streams:
   * @see [Table](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#setremotevideostreamtype)
   *
   * @param stream The remote video stream object.
   * @param streamType Sets the remote video stream type. The following lists the video-stream types:
   * - 0: High-bitrate, high-resolution video stream.
   * - 1: Low-bitrate, low-resolution video stream.
   *
   * @example
   * switchStream = function (){
   *   if (highOrLow === 0) {
   *     highOrLow = 1
   *     console.log("Set to low");
   *   }
   *   else {
   *     highOrLow = 0
   *     console.log("Set to high");
   *   }
   *
   *   client.setRemoteVideoStreamType(stream, highOrLow);
   * }
   */
  setRemoteVideoStreamType: (stream: Stream, streamType: 0 | 1) => void;
  /**
   * Use this method to set stream fallback option on the receiver.
   *
   * Under poor network conditions, the SDK can choose to subscribe to the low-video stream or only the audio stream.
   *
   * @description
   * This method can only be used when the publisher has enabled the dual-stream mode by
   * [enableDualStream](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#enabledualstream).
   *
   * @param stream The remote stream object.
   * @param fallbackType The fallback option:
   * - 0: Disable the fallback.
   * - 1: (Default) Automatically subscribe to the low-video stream under poor network.
   * - 2: Under poor network, the SDK may subscribe to the low-video stream (of lower resolution and lower bitrate) first,
   * but if the network still does not allow displaying the video, the SDK will receive audio only.
   *
   * @example
   * // The sender side, after publishing the high stream
   *  client.enableDualStream();
   *
   *  // The receiver side, set the fallback option as 2
   *  client.setStreamFallbackOption(remoteStream, 2);
   *
   */
  setStreamFallbackOption: (stream: Stream, fallbackType: 0 | 1 | 2) => void;
  /**
   * Deploys the TURN Server.
   *
   * @description
   * Ensure that you call this API before
   * [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   *
   * @see [setTurnServer](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#setturnserver)
   */
  setTurnServer: (turnServer: TurnServer) => void;
  /**
   * This method starts a live stream.
   *
   * @description
   * Call [startLiveStreaming](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startlivestreaming)
   * after [createStream](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#createstream).
   *
   * @param url URL address for the live stream. ASCII characters only, and
   * the string length must be greater than 0 and less than 256 bytes.
   * @param [enableTranscoding] Marks whether to enable live transcoding.
   * If set as true, setLiveTranscoding must be called before this method.
   *
   * @see [Push Streams to the CDN](https://docs.agora.io/en/Video/push_stream_web).
   */
  startLiveStreaming: (url: string, enableTranscoding?: boolean) => void;
  /**
   * This method stops and deletes the live streaming.
   *
   * @param url URL address of the live streaming. ASCII characters only, and
   * the string length must be greater than 0 and less than 256 bytes.
   */
  stopLiveStreaming: (url: string) => void;
  /**
   * This method enables a user to subscribe to a remote stream.
   *
   * @example
   * client.subscribe(stream, err => {
   *    console.error("stream subscribe failed", err);
   *    //……
   * });
   */
  subscribe: (stream: Stream, options?: SubscribeOptions, onFailure?: (error: Error) => void) => void;
  /**
   * Unpublishes the Local Stream.
   *
   * @param stream Stream object, which represents the local stream.
   *
   * @example
   * client.unpublish(stream, err => {
   *    console.log(err);
   *    //……
   * })
   */
  unpublish: (stream: Stream, onFailure?: (error: Error) => void) => void;
  /**
   * Unsubscribes from a Remote Stream.
   *
   * @param stream Stream object, which represents the remote stream.
   *
   * @example
   * client.unsubscribe(stream, err => {
   *   console.log(err);
   *   //……
   * })
   *
   */
  unsubscribe: (stream: Stream, onFailure?: (error: Error) => void) => void;
  aesMode: string;
  aespassword: string;
  gatewayClient: {}; // add object
  highStream: any; // ? type
  highStreamState: number;
  isDualStream: boolean;
  key: any; // ? string
  lowStream: any; // ?
  lowStreamParameter: any; // ?
  lowStreamState: number;
  proxyServer: any; // ?
  turnServer: any; // function
}
