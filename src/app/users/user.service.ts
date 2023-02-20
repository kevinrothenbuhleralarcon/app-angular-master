import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/user';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _eventsBehaviourSubject$ = new BehaviorSubject<string>('init'); // Doit être un BehaviousSubject afin qu'il emette une valeur à la subscription
  events$ = this._eventsBehaviourSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getList$(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users`).pipe(
      tap(() => console.log('get user list'))
    );
  }

  create$(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, user).pipe(
      tap(() => this._eventsBehaviourSubject$.next('user.add'))
    );
  }

  getById$(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/users/${id}`).pipe(
      tap(() => this._eventsBehaviourSubject$.next('user.delete'))
    );
  }
}
