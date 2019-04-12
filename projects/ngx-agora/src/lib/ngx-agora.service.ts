import { Inject, Injectable } from '@angular/core';
import * as agoraSDK from 'agora-rtc-sdk';

import { AgoraClient } from './data/models/agora-client.model';
import { AgoraConfig } from './data/models/agora-config.model';
import { AgoraRTC, ClientConfig, MediaDeviceInfo, StreamSpec } from './data/models/exports';

@Injectable({
  providedIn: 'root'
})
export class NgxAgoraService {
  private static AgoraRTC: AgoraRTC = agoraSDK;

  client: AgoraClient;
  audioDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  AgoraRTC: AgoraRTC = NgxAgoraService.AgoraRTC;

  constructor(@Inject('config') private config: AgoraConfig) {
    if (!this.checkSystemRequirements()) {
      this.AgoraRTC.Logger.error('Web RTC is not supported in this browser');
    } else {
      this.collectDevices();
    }
  }

  checkSystemRequirements(): boolean {
    return this.AgoraRTC.checkSystemRequirements();
  }

  createClient(config: ClientConfig): void {
    this.client = this.AgoraRTC.createClient(config);
    this.client.init(this.config.AppID);
  }

  createStream(spec: StreamSpec) {
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
