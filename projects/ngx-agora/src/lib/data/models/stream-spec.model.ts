import { MediaStreamTrack } from './media-stream-track.model';

/**
 * A class defining the `spec` paramter in the
 * [createStream](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#createstream) method.
 *
 *  * @remarks
 * - Do not set `video` and `screen` as `true` at the same time.
 * - To enable screen-sharing on the Firefox browser, ensure that the `screen` property is
 * set to `true`, and the `mediaSource` property has been set to specify a certain sharing mode.
 *
 * # Create a Stream
 *
 * You have two options to create an audio/video stream:
 *
 *  ## Set the audio, video, and screen properties
 *  const stream = AgoraRTC.createStream({
 *   streamID: uid,
 *   audio:true,
 *   video:true,
 *   screen:false
 *  });
 *
 *
 * ## Set the audioSource and videoSource properties
 *
 * Compared with the first option, the
 * [audioSource](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.streamspec.html#audiosource)
 * and [videoSource](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.streamspec.html#videosource)
 * properties can specify the audio and video tracks for the stream. Use this option if you need to process the audio
 * and video before creating the stream.
 *
 * Use the `mediaStream` method to get the audio and video tracks from `MediaStreamTrack`, and then set `audioSource` and `videoSource`:
 *
 * navigator.mediaDevices.getUserMedia(
 *     {video: true, audio: true}
 * ).then(function(mediaStream){
 *     var videoSource = mediaStream.getVideoTracks()[0];
 *     var audioSource = mediaStream.getAudioTracks()[0];
 *     // After processing videoSource and audioSource
 *     var localStream = AgoraRTC.createStream({
 *         video: true,
 *         audio: true,
 *         videoSource: videoSource,
 *         audioSource: audioSource
 *     });
 *     localStream.init(function(){
 *         client.publish(localStream, function(e){
 *             //...
 *         });
 *     });
 * });
 *
 * @remarks
 * - `MediaStreamTrack` refers to the `MediaStreamTrack` object supported by the browser.
 * - Currently this option only supports the Chrome brower.
 *
 * @see [MediaStreamTrack API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) for details.
 *
 *
 * ### Enable Screen-sharing on the Chrome Web Browser
 *
 * const stream = AgoraRTC.createStream({
 *   streamID: uid,
 *   audio:false,
 *   video:false,
 *   screen:true,
 *   extensionId:"minllpmhdgpndnkomcoccfekfegnlikg"});
 *
 * ### Enable Screen-sharing on the Firefox Web Browser
 *
 * localStream = AgoraRTC.createStream({
 *      streamID: uid,
 *      audio: false,
 *      video: false,
 *      screen: true,
 *      mediaSource: "screen",
 *    });
 *
 * For a tutorial on screen-sharing on a website,
 * @see [Share the Screen](https://docs.agora.io/en/Video/screensharing_web?platform=Web).
 */
export interface StreamSpec {
  /**
   * Whether this stream contains an audio track.
   */
  audio: boolean;
  /**
   * Whether to enable audio processing.
   *
   * @param [AEC] Whether to enable acoustic echo cancellation.
   * The default value is `true` (enable). If you wish not to enable the acoustic echo cancellation, set AEC as `false`.
   * @param [AGC] Whether to enable audio gain control.
   * The default value is true (enable). If you wish not to enable the audio gain control, set AGC as false.
   * @param [ANS] Whether to enable automatic noise suppression.
   * The default value is true (enable). If you wish not to enable automatic noise suppression, set ANS as false.
   *
   * @remarks
   * - Safari does not support this setting.
   * - Noise suppression is always enabled on Firefox. Setting ANS as false does not take effect on Firefox.
   */
  audioProcessing?: {
    AEC?: boolean;
    AGC?: boolean;
    ANS?: boolean;
  };
  /**
   * Specifies the audio source of the stream.
   */
  audioSource?: MediaStreamTrack;
  /**
   * The camera device ID retrieved from the getDevices method.
   *
   * The retrieved ID is ASCII characters, and the string length is greater than 0 and less than 256 bytes.
   */
  cameraId?: string;
  /**
   * The extension ID of the Chrome screen-sharing extension.
   *
   * ASCII characters only, and the string length must be greater than 0 and less than 256 bytes.
   * Set this property if you use the Chrome screen-sharing extension. See Chrome Extension for Screen Sharing for details.
   *
   * @remarks
   * Chrome 72 and later versions support screen sharing without the extension. You can leave extensionId as empty.
   * If you set the extensionId, then you need to use the screen-sharing extension.
   */
  extensionId?: string;
  /**
   * Sets using the front or rear camera
   *
   * You can set this parameter to use the front or rear camera on mobile devices:
   * - "user": The front camera
   * - "environment": The rear camera
   */
  facingMode?: 'user' | 'environment';
  /**
   * The screen-sharing mode on the Firefox browser.
   *
   * If you are using the Firefox browser, setting this property specifies the screen-sharing mode:
   * - "screen": (default) share the current screen
   * - "application": share all windows of an App
   * - "window": share a specified window of an App
   *
   * @remarks
   * Firefox on Windows does not support the application mode.
   *
   * @see
   * [Screen Sharing on Firefox](https://docs.agora.io/en/Video/screensharing_web?platform=Web#a-name-ff-a-screen-sharing-on-firefox)
   * for details.
   */
  mediaSource?: 'screen' | 'application' | 'window';
  /**
   * The microphone device ID retrieved from the
   * [getDevices](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#getdevices) method.
   *
   * The retrieved ID is ASCII characters, and the string length is greater than 0 and less than 256 bytes.
   */
  microphoneId?: string;
  /**
   * Whether the video image of the publisher is mirrored on the publisher’s webpage.
   * The default value is `true` (except in the screen-share mode). Agora recommends enabling this function
   * when using the front camera, and disabling it when using the rear camera.
   */
  mirror?: boolean;
  /**
   * Whether this stream contains a screen-sharing track.
   */
  screen?: boolean;
  /**
   * The stream ID.
   *
   * Please set the stream ID as the user ID, which can be retrieved from the callback of
   * [Client.join](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#join).
   */
  streamID?: number | string;
  /** Whether this stream contains a video track. */
  video: boolean;
  /**
   * Specifies the video source of the stream.
   *
   * @remarks
   * If you use a video source created by the Canvas API, re-draw on the canvas every one second
   * when the drawing is still to keep the video publishing.
   */
  videoSource?: MediaStreamTrack;
}
