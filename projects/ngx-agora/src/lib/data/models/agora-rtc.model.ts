import { AgoraClient } from './agora-client.model';
import { ClientConfig } from './client-config.model';
import { StreamSpec } from './stream-spec.model';
import { Stream } from './stream.model';

export interface AgoraRTC {
  /**
   * Checks the Web Browser Compatibility
   *
   * This method checks the compatibility between the Web SDK and the current web browser.
   * Use this method before calling createClient to check the compatibility between the system and the web browser.
   *
   * - true: The Web SDK is compatible with the current web browser.
   * - false: The Web SDK is not compatible with the current web browser.
   *
   * @description
   * Agora has yet to conduct comprehensive tests on Chromium kernel browsers, such as QQ and 360.
   * Agora will gradually achieve compatibility on most mainstream browsers in subsequent versions of the Web SDK.
   */
  checkSystemRequirements: () => boolean;
  /**
   * Creates a Client Object
   *
   * This method creates and returns a client object. You can only call this method once each call session.
   *
   * @param config
   * Defines the property of the client, see
   * [ClientConfig](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html) for details.
   *
   * @example
   * AgoraRTC.createClient(config);
   */
  createClient: (config: ClientConfig) => AgoraClient;
  /**
   * This method creates and returns a stream object.
   *
   * @param spec Defines the properties of the stream, see StreamSpec for details.
   */
  createStream: (spec: StreamSpec) => Stream;
  getDevices;
  getScreenSources;
  getSupportedCodec;
}
