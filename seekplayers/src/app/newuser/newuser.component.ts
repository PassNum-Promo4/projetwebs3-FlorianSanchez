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



    public cardData: any = {
        'creator': ''
    };
    public user: any;
    public champions: any[] = [];
    public champions_obj: any;
    constructor(public _auth: AuthService, public _router: Router, public _playerService: PlayerService) { }

    modifyCard() {
        const creator = localStorage.getItem('_id');
        this.cardData.creator = creator;
        this._playerService.modifyCard(this.cardData).subscribe(
            res => {
                this.user.playercard = this.cardData;
                localStorage.setItem('user', JSON.stringify(this.user));
            },
            err => console.log(err)
        );
    }

    deleteCard() {
        const id = localStorage.getItem('_id');
        this._playerService.deleteCard(id).subscribe(
            res => {
                delete this.user.playercard;
                this.cardData = {};
                localStorage.setItem('user', JSON.stringify(this.user));
            },
            err => console.log(err)
        );
    }

    postPlayerData() {
        const creator = localStorage.getItem('_id');
        this.cardData.creator = creator;
        this._playerService.postPlayerData(this.cardData).subscribe(
            res => {
                localStorage.setItem('user', JSON.stringify(res.user));
                this.user = this._auth.getUser();
            },
            err => console.log(err)
        );
    }

    ngOnInit() {
        this.user = this._auth.getUser();
        if (this.user.playercard && this.user) {
            this.cardData = this.user.playercard;
        }

        this._playerService.getChampions().subscribe((res) => {
            this.champions_obj = res.champions;

            Object.keys(res.champions).forEach((champion) => {
                this.champions.push(res.champions[champion]);
            });
        });
    }

}
