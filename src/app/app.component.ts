import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AgoraClient, NgxAgoraService, Stream, AgoraEvent } from 'ngx-agora';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private localStream: Stream;
  private client: AgoraClient;

  /**
   * App ID used when connecting to the Agora.io servers
   */
  appId: FormControl = new FormControl((environment as any).agora ? (environment as any).agora.appId : '');
  /**
   * Channel (meeting room) within the Agora app to join
   */
  channel = new FormControl('123');
  /**
   * Generated user ID that is attached to the local client when joining a meeting room
   */
  uid: number;

  /**
   * All the IDs of other users that have joined the call
   */
  remoteCalls: string[] = [];
  /**
   * Whether the local client has tuned in to the Agora meeting room
   */
  connected = false;
  /**
   * Whether the local client's A/V stream has been published to the remote meeting room
   */
  published = false;

  constructor(private agoraService: NgxAgoraService) {
    this.uid = Math.floor(Math.random() * 100);

    this.agoraService.createClient('rtc');
    this.client = this.agoraService.client;
  }

  ngOnInit() {
    this.client.init(this.appId.value, () => console.log('Initialized successfully'), () => console.log('Could not initialize'));
  }

  join(): void {
    this.localStream = this.agoraService.createStream(this.uid, true, null, null, true, false);
    this.init();

    this.client.join(null, this.channel.value, this.uid);
  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  unpublish(): void {
    this.client.unpublish(this.localStream, error => {
      console.error(error);
    });
    this.published = false;
  }

  leave(): void {
    this.client.leave(
      () => {
        console.log('Left the channel successfully');
        this.connected = false;
        this.published = false;
        this.remoteCalls = [];
      },
      err => {
        console.log('Leave channel failed');
      }
    );
    this.client.unpublish(this.localStream, error => {
      console.error(error);
    });
  }

  protected init(): void {
    this.localStream.init(
      () => {
        console.log('getUserMedia successfully');
        this.localStream.play('agora_local');
        this.connected = true;
        this.assignHandlers();
        console.warn(this.localStream);
      },
      err => console.log('getUserMedia failed', err)
    );
  }

  private assignHandlers(): void {
    this.client.on(AgoraEvent.LocalStreamPublished, evt => {
      this.published = true;
      console.log('Publish local stream successfully');
    });
    // The user has granted access to the camera and mic.
    this.localStream.on('accessAllowed', () => {
      console.log('accessAllowed');
    });
    // The user has denied access to the camera and mic.
    this.localStream.on('accessDenied', () => {
      console.log('accessDenied');
    });

    this.client.on(AgoraEvent.Error, err => {
      console.log('Got error msg:', err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => {
            console.log('Renew channel key successfully');
          },
          err => {
            console.log('Renew channel key failed: ', err);
          }
        );
      }
    });

    this.client.on(AgoraEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(AgoraEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(AgoraEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = [];
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    this.client.on(AgoraEvent.PeerLeave, evt => {
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }
}
