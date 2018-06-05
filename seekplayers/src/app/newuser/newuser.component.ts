import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { log } from 'util';
import { NotificationsService } from 'angular2-notifications';


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
    constructor(public _auth: AuthService, public _router: Router, public _playerService: PlayerService,
        public _notifications: NotificationsService) { }

    modifyCard() {
        const creator = localStorage.getItem('_id');    // getback the id then modify cardData
        this.cardData.creator = creator;
        this._playerService.modifyCard(this.cardData).subscribe(
            res => {
                this.user.playercard = this.cardData;           // set playercard to his user
                localStorage.setItem('user', JSON.stringify(this.user));
                const toast = this._notifications.success('', res.message, {    // notifications
                    timeOut: 3000,
                    showProgressBar: false,
                    pauseOnHover: false,
                    clickToClose: true
                });
                toast.click.subscribe(() => {
                    this.modifyCard();
                });
            },
            err => console.log(err)
        );
    }

    deleteCard() {
        const id = localStorage.getItem('_id'); // delete card on user
        this._playerService.deleteCard(id).subscribe(
            res => {
                delete this.user.playercard;
                this.cardData = {};
                localStorage.setItem('user', JSON.stringify(this.user));
                const toast = this._notifications.success('', res.message, {    // notifications
                    timeOut: 3000,
                    showProgressBar: false,
                    pauseOnHover: false,
                    clickToClose: true
                  });
                  toast.click.subscribe(() => {
                    this.deleteCard();
                });
            },
            err => console.log(err)
        );
    }

    postPlayerData() {
        const creator = localStorage.getItem('_id');
        this.cardData.creator = creator;                        // set the reator id to cardData id
        this._playerService.postPlayerData(this.cardData).subscribe(    // call postplayerData method on api
            res => {
                localStorage.setItem('user', JSON.stringify(res.user));
                this.user = this._auth.getUser();                       // get user for gettings value on card when we want to modifier
                const toast = this._notifications.success('', res.message, {        // notifications
                    timeOut: 3000,
                    showProgressBar: false,
                    pauseOnHover: false,
                    clickToClose: true
                  });
                  toast.click.subscribe(() => {
                    this.postPlayerData();
                });
            },
            err => console.log(err)
        );
    }

    ngOnInit() {
        this.user = this._auth.getUser();       // verify id for usercard player
        if (this.user.playercard && this.user) {
            this.cardData = this.user.playercard;
        }

        this._playerService.getChampions().subscribe((res) => { // get champions list to my champions_obj
            this.champions_obj = res.champions;

            Object.keys(res.champions).forEach((champion) => {  // push my newtab with a champions
                this.champions.push(res.champions[champion]);
            });
        });
    }

}
