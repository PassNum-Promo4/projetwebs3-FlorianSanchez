import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { log } from 'util';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  cardData = {
    'creator': ''
  };
  constructor(public _auth: AuthService, public _router: Router, public _playerService: PlayerService) { }

  postPlayerData() {
    const creator = localStorage.getItem('_id');
    this.cardData.creator = creator;
    this._playerService.postPlayerData(this.cardData).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  ngOnInit() {
  }

}
