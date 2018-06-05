import { Component, OnInit, Pipe } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit {
  rank = '*';               // value on my filter
  players = [];             // tab with all players
  playersFiltered = [];     // my new tab filtered
  constructor(private _playerService: PlayerService, public _router: Router) { }



  playersFilter() {
    this.playersFiltered = this.players.filter((player) => {    // create new tab playersFiltered by filter with rank value
      return (player.rank === this.rank || this.rank === '*');

    });
  }

  ngOnInit() {      // return playersFilteredtab with players
    this._playerService.getPlayers()
      .subscribe(
        res => {
          this.players = res;
          this.playersFiltered = this.players;
        },
        err => console.log(err)
      );
  }
}
