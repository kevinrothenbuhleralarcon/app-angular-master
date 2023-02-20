import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {share, switchMap} from 'rxjs/operators';

import {User} from '../../shared/models/user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  public users$: Observable<User[]>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title.setTitle(data.title);
    });

    this.users$ = this.userService.events$.pipe(
      switchMap(() => this.userService.getList$()),
      share(), // Empêche l'appel multiple si plusieurs subscription
      // shareReplay(1) // Empêche l'appel multiple si plusieurs subscription, à utiliser si late subscription pour retourner la dernière valeur
    );
  }

}
