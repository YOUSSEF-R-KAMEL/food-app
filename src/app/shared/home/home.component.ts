import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  animatedUsername: string = '';
  waveUsername: string[] = [];
  subscription!: Subscription;
  ngOnInit(): void {
    this.prepareWaveUserName();
  }
  get userName() {
    return localStorage.getItem('userName');
  }
  prepareWaveUserName () {
    this.waveUsername = this.userName!.split('');
  }


}
