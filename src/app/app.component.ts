import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  music = [
    'Có Phải Em Mùa Thu Hà Nội',
    'Em Ơi Hà Nội Phố',
    'Hà Nội Của Tôi', 
    'Hà Nội Mùa Thu',
    'Hà Nội Mùa Vắng Những Cơn Mưa',
    'Hướng Về Hà Nội',
    'Nhớ Mùa Thu Hà Nội',
    'Nhớ Về Hà Nội',
  ];
  current: number = 0;
  progress: number = 0;
  repeat: boolean = false;
  shuffle: boolean = false;
  menu: boolean = false;

  @ViewChild('audio') audio;

  constructor() {
  }

  ngOnInit() {
    this.run(this.current);
  }

  run(index: number, auto: boolean = false) {
    if(this.shuffle && auto) {
      index = Math.floor(Math.random() * (this.music.length - 1));
    }
    if(index >= this.music.length) {
      index = 0;
    }
    if(index < 0) {
      index = this.music.length - 1;
    }
    this.current = index;
    this.audio.nativeElement.src = `./assets/${this.music[index]}.mp3`;
		this.audio.nativeElement.load();
    this.audio.nativeElement.play();
  }

  goTo(e) {
    this.audio.nativeElement.currentTime = this.audio.nativeElement.duration * e.offsetX / e.currentTarget.offsetWidth;
    this.timeupdate();
  }

  timeupdate() {
    let progress = 100 * this.audio.nativeElement.currentTime / this.audio.nativeElement.duration;
    if (!isNaN(progress)) {
      this.progress = progress
    }
  }
}
