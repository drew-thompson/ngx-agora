import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AgoraClient, NgxAgoraService, Stream } from 'ngx-agora';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected localStream: Stream;
  protected client: AgoraClient;

  appId = new FormControl('f07033f31b7d436ab62d948320dd0a01');
  channel = new FormControl('123');
  uid: number;

  remoteCalls: string[] = [];
  connected = false;

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
    this.connected = false;
  }

  leave(): void {
    this.client.leave(
      () => {
        console.log('Leavel channel successfully');
        this.connected = false;
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
        this.assignHandlers();
        console.warn(this.localStream);
      },
      err => console.log('getUserMedia failed', err)
    );
  }

  private assignHandlers(): void {
    this.client.on('stream-published', evt => {
      this.connected = true;
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

    this.client.on('error', err => {
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

    this.client.on('stream-added', evt => {
      const stream = evt.stream;
      console.warn(stream);
      this.client.subscribe(stream, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on('stream-subscribed', evt => {
      const stream = evt.stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on('stream-removed', evt => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = [];
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    this.client.on('peer-leave', evt => {
      const stream = evt.stream;
      console.warn('Peer Leave');
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call === `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }
}
