/**
 * Error message of the media stream relay.
 */
export enum ChannelMediaMessage {
  /** No error. */
  'RELAY_OK',
  /** An error occurs in the server response. */
  'SERVER_ERROR_RESPONSE',
  /** No server response. */
  'SERVER_NO_RESPONSE',
  /** The SDK fails to access the service, probably due to limited resources of the server. */
  'NO_RESOURCE_AVAILABLE',
  /** Fails to send the relay request. */
  'FAILED_JOIN_SRC',
  /** Fails to accept the relay request. */
  'FAILED_JOIN_DEST',
  /** The server fails to receive the media stream. */
  'FAILED_PACKET_RECEIVED_FROM_SRC',
  /** The server fails to send the media stream. */
  'FAILED_PACKET_SENT_TO_DEST',
  /**
   * The SDK disconnects from the server and fails to reconnect to the server due to a poor network connection.
   * In this case, the SDK resets the media stream relay state.
   * You can try
   * [startChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   * to restart the media stream relay.
   */
  'SERVER_CONNECTION_LOST',
  /** An internal error occurs in the server. */
  'INTERNAL_ERROR',
  /** The token of the source channel has expired. */
  'SRC_TOKEN_EXPIRED',
  /** The token of the destination channel has expired. */
  'DEST_TOKEN_EXPIRED',
  /**
   * The relay has already started. Possibly caused by calling
   * [startChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   * repeatedly, or calling
   * [startChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   * before
   * [stopChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#stopchannelmediarelay)
   * succeeds.
   */
  'RELAY_ALREADY_START',
  /**
   * The relay has not started. Possibly caused by calling
   * [updateChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#updatechannelmediarelay)
   * before
   * [startChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay)
   * succeeds.
   */
  'RELAY_NOT_START',
}
