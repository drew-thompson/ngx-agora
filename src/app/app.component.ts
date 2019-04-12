import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
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

    this.client = this.agoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
  }

  ngOnInit() {
    this.client.init(this.appId.value, () => console.log('Initialized successfully'), () => console.log('Could not initialize'));
  }

  join(): void {
    this.localStream = this.agoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.init();

    this.client.join(null, this.channel.value, this.uid);
  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  unpublish(): void {
    this.client.unpublish(this.localStream, error => console.error(error));
    this.published = false;
  }

  leave(): void {
    if (this.connected) {
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
    } else {
      this.agoraService.AgoraRTC.Logger.warning('Local client is not connected to channel.');
    }
  }

  protected init(): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        console.log('getUserMedia successfully');
        this.localStream.play('agora_local');
        this.connected = true;
      },
      err => console.log('getUserMedia failed', err)
    );
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });
    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      this.published = true;
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
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
