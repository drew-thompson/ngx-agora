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
   * Occurs when the audio mixing stream playback starts/resumes.
   *
   * @remarks
   * This callback is triggered when the audio mixing stream is loaded and starts playing,
   * or when the paused audio mixing stream resumes playing.
   */
  AudioMixingPlayed = 'audioMixingPlayed',
  /** Occurs when the last audio mixing stream playback finishes. */
  AudioMixingFinished = 'audioMixingFinished'
}
