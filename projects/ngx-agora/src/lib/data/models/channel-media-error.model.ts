import { ChannelMediaMessage } from '../enums/channel-media-message.enum';

type ErrorCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

/**
 * Error information of the media stream relay.
 *
 * When errors occur in calling
 * [startChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#startchannelmediarelay),
 * [updateChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#updatechannelmediarelay), or
 * [stopChannelMediaRelay](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html#stopchannelmediarelay),
 * the callback functions of these methods provide error details in this class.
 *
 * In this class, `code` is the error code and `message` is the error message.
 *
 * @see [the following table](https://docs.agora.io/en/Video/API%20Reference/web/classes/agorartc.channelmediaerror.html) for details.
 */
export interface ChannelMediaError {
  /** The error code. */
  code: ErrorCode;
  /** Additional information. */
  data: any;
  /** The error message. */
  message: [keyof typeof ChannelMediaMessage];
}
