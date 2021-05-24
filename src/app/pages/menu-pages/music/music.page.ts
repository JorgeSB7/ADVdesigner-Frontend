import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonRange, ModalController } from '@ionic/angular';
import { Howl, Howler } from 'howler';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnDestroy {
  tf = false;
  @Input("value") value;

  playlist: Track[] = [
    {
      name: 'Batalla épica',
      path: './assets/mp3/Batalla épica.mp3'
    },
    {
      name: 'Canción de taberna',
      path: './assets/mp3/Canción de taberna.mp3'
    },
    {
      name: 'Tras la batalla',
      path: './assets/mp3/Tras la batalla.mp3'
    },
    {
      name: 'bensound-creativeminds',
      path: './assets/mp3/bensound-creativeminds.mp3'
    },
    {
      name: 'bensound-littleidea',
      path: './assets/mp3/bensound-littleidea.mp3'
    },
    {
      name: 'bensound-funnysong',
      path: './assets/mp3/bensound-funnysong.mp3'
    }
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;

  constructor(private modalController: ModalController) { }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.stop();
    }
  }

  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        console.log('onplay');
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log('onend');
      }
    });
    this.player.play();
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
      this.tf = true;
    } else {
      this.player.play();
      this.tf = false;
    }
  }

  next() {
    this.tf = false;
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    this.tf = false;
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (<any>seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }

  public exit() {
    this.modalController.dismiss();
  }

}
