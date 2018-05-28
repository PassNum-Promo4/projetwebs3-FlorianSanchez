import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-players',
  templateUrl: './special-players.component.html',
  styleUrls: ['./special-players.component.css']
})
export class SpecialPlayersComponent implements OnInit {

  specialPlayers = [];

  constructor(private _playerService: PlayerService,
              private _router: Router) { }

  ngOnInit() {
    this._playerService.getSpecialPlayers()
      .subscribe(
        res => this.specialPlayers = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }

}
