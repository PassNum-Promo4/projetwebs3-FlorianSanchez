import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class PlayerService {

  private _playersUrl = 'http://localhost:3000/api/players';
  private _riotUrl = 'http://localhost:3000/api/champions';
  private _newUserUrl = 'http://localhost:3000/api/newuser';

  constructor(private http: HttpClient) { }   // All routes for backend api methodes

  getChampions() {
    return this.http.get<any>(this._riotUrl, {});
  }

  getPlayers() {
    return this.http.get<any>(this._playersUrl);
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
