import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  cardData = {
    'creator': ''
  };
  players = [];
  constructor(private _playerService: PlayerService, public _router: Router) { }


  ngOnInit() {
    this._playerService.getPlayers()
      .subscribe(
        res => this.players = res,
        err => console.log(err)
      );
  }
}
