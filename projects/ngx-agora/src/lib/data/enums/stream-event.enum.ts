/**
 * /**
 * Events that the Agora.io SDK `Stream.on()` function recognizes.
 *
 * If the API changes faster than the library, a quick type override can help bypass compiler errors:
 *
 * @example
 * localStream.on('new-event' as ClientEvent, (data) => {})
 */
export enum StreamEvent {
  /** Occurs when the user gives access to the camera and microphone. */
  MediaAccessAllowed = 'accessAllowed',
  /** Occurs when the user denies access to the camera and microphone. */
  MediaAccessDenied = 'accessDenied',
  /** Occurs when screen-sharing stops. */
  ScreenSharingStopped = 'stopScreenSharing',
  /**
   * Occurs when the video track no longer provides data to the stream.
   *
   * Possible reasons include device removal and deauthorization. See [Media​Stream​Track​.onended](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/onended).
   */
  VideoTrackEnded = 'videoTrackEnded',
  /**
   * Occurs when the audio track no longer provides data to the stream.
   *
   * Possible reasons include device removal and deauthorization. See [Media​Stream​Track​.onended](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/onended).
   */
  AudioTrackEnded = 'audioTrackEnded',
  /**
   * Occurs when the audio mixing stream playback starts/resumes.
   *
   * @remarks
   * This callback is triggered when the audio mixing stream is loaded and starts playing,
   * or when the paused audio mixing stream resumes playing.
   */
  AudioMixingPlayed = 'audioMixingPlayed',
  /** Occurs when the last audio mixing stream playback finishes. */
  AudioMixingFinished = 'audioMixingFinished', 
  /**
   * Occurs when the stream playback status changes.
   *
   * On Windows, frequent DOM manipulations might cause the browser to pause the Chrome player.
   * To avoid this, you can listen for this event and call the [Stream.resume](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.stream.html#resume) method to resume the playback.
   * */
  PlayerStatusChange = 'player-status-change',
}
