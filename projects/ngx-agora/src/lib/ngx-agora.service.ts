import { Inject, Injectable } from '@angular/core';
import * as agoraSDK from 'agora-rtc-sdk';

import { AgoraClient } from './data/models/agora-client.model';
import { AgoraConfig } from './data/models/agora-config.model';
import { AgoraRTC, ClientConfig, MediaDeviceInfo, Stream, StreamSpec } from './data/models';

/**
 * Provides access to the Agora web API, including the AgoraRTC and Client objects.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxAgoraService {
  private static AgoraRTC: AgoraRTC = agoraSDK;

  /**
   * The local Agora.io Client object.
   * @see [Web Client](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.client.html)
   */
  client: AgoraClient;
  /**
   * All audio devices collected from the AgoraRTC `getDevices()` method.
   * @see [getDevices()](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#getdevices)
   *
   */
  audioDevices: MediaDeviceInfo[] = [];
  /**
   * All video devices collected from the AgoraRTC `getDevices()` method.
   * @see [getDevices()](https://docs.agora.io/en/Video/API%20Reference/web/globals.html#getdevices)
   */
  videoDevices: MediaDeviceInfo[] = [];
  /**
   * Instance reference to the `static` AgoraRTC library object.
   */
  AgoraRTC: AgoraRTC = NgxAgoraService.AgoraRTC;

  constructor(@Inject('config') private config: AgoraConfig) {
    if (!this.checkSystemRequirements()) {
      this.AgoraRTC.Logger.error('Web RTC is not supported in this browser');
    } else {
      this.collectDevices();
    }
  }

  /**
   * Checks the Web Browser Compatibility
   *
   * This method checks the compatibility between the Web SDK and the current web browser.
   * Use this method before calling createClient to check the compatibility between the system and the web browser.
   *
   * - true: The Web SDK is compatible with the current web browser.
   * - false: The Web SDK is not compatible with the current web browser.
   *
   * @remark
   * Agora has yet to conduct comprehensive tests on Chromium kernel browsers, such as QQ and 360.
   * Agora will gradually achieve compatibility on most mainstream browsers in subsequent versions of the Web SDK.
   */
  checkSystemRequirements(): boolean {
    return this.AgoraRTC.checkSystemRequirements();
  }

  /**
   * Creates a Client object.
   *
   * This method creates and returns a client object. You can only call this method once each call session.
   *
   * @param config
   * Defines the property of the client, see
   * [ClientConfig](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html) for details.
   * @param [autoInitializing=true] Ngx-agora by default automatically initializes the client with the provided `AppID` after it is created.
   * Set this property to `false` to disable this functionality, if you are going to call `init()` separately
   * (after creating the client only).
   * @param [onSuccess] The callback when the method succeeds.
   * @param [onFailure] The callback when the method fails.
   *
   * @example
   * AgoraRTC.createClient(config);
   */
  createClient(
    config: ClientConfig,
    autoInitializing: boolean = true,
    onSuccess?: () => void,
    onFailure?: (error: Error) => void
  ): AgoraClient {
    this.client = this.AgoraRTC.createClient(config);
    if (autoInitializing) {
      this.init(this.config.AppID, onSuccess, onFailure);
    }
    return this.client;
  }

  /**
   * This method creates and returns a stream object.
   *
   * @example
   * AgoraRTC.createStream(spec)
   *
   * @param spec Defines the properties of the stream
   * @see [StreamSpec](https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.streamspec.html) for details.
   */
  createStream(spec: StreamSpec): Stream {
    if (!spec.microphoneId && this.audioDevices && this.audioDevices.length) {
      const defaultMic = this.audioDevices[0].deviceId;
      spec.microphoneId = defaultMic;
    }
    if (!spec.cameraId && this.videoDevices && this.videoDevices.length) {
      const defaultCamera = this.videoDevices[0].deviceId;
      spec.cameraId = spec.cameraId || defaultCamera;
    }

    return this.AgoraRTC.createStream(spec);
  }

  /**
   * Initializes the Client object.
   *
   * @param appId Pass in the App ID for your project.
   * ASCII characters only, and the string length must be greater than 0 and less than 256 bytes.
   * To get your App ID,
   * @see [Get an App ID](https://docs.agora.io/en/Video/web_prepare?platform=Web#create-an-agora-account-and-get-an-app-id).
   * @param [onSuccess] The callback when the method succeeds.
   * @param [onFailure] The callback when the method fails.
   *
   * @example
   * this.ngxAgoraService.client.init(appId, () => {
   * console.log("client initialized");
   * // Join a channel
   * //……
   * }, error => {
   *     console.log("client init failed ", err);
   *     // Error handling
   * });
   */
  init(appId: string, onSuccess?: () => void, onFailure?: (error: Error) => void): void {
    this.client.init(appId, onSuccess, onFailure);
  }

  /**
   * Attempts to automatically collect audio and video devices from the AgoraRTC `getDevices()` method.
   */
  private collectDevices(): void {
    this.AgoraRTC.getDevices((devices: MediaDeviceInfo[]) => {
      const audioDevices = devices.filter(device => {
        return device.kind === 'audioinput' && device.deviceId !== 'default';
      });

      const videoDevices = devices.filter(device => {
        return device.kind === 'videoinput' && device.deviceId !== 'default';
      });

      this.audioDevices = audioDevices;
      this.videoDevices = videoDevices;
    });
  }
}
