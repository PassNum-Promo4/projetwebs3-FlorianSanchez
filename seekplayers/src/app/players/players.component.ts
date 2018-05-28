import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players = [];
  constructor(private _playerService: PlayerService) { }

  ngOnInit() {
    this._playerService.getPlayers()
      .subscribe(
        res => this.players = res,
        err => console.log(err)
      );
  }

}
