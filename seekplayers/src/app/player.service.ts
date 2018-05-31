import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class PlayerService {

  private _playersUrl = 'http://localhost:3000/api/players';
  private _specialPlayersUrl = 'http://localhost:3000/api/special';
  private _newUserUrl = 'http://localhost:3000/api/newuser';

  constructor(private http: HttpClient) { }

  getPlayers() {
    return this.http.get<any>(this._playersUrl);
  }

  getSpecialPlayers() {
    return this.http.get<any>(this._specialPlayersUrl);
  }

  postPlayerData(cardData) {
    return this.http.post<any>(this._newUserUrl, cardData);
  }

  deleteCard(id) {
    return this.http.delete<any>(this._newUserUrl + '/' + id);
  }

  modifyCard(newCardData) {
    return this.http.put<any>(this._newUserUrl, newCardData);
  }

}
