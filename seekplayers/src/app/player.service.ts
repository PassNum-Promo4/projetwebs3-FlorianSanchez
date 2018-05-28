import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class PlayerService {

  private _playersUrl = 'http://localhost:3000/api/players';
  private _specialPlayersUrl = 'http://localhost:3000/api/special';

  constructor(private http: HttpClient) { }

  getPlayers() {
    return this.http.get<any>(this._playersUrl);
  }

  getSpecialPlayers() {
    return this.http.get<any>(this._specialPlayersUrl);
  }

}
