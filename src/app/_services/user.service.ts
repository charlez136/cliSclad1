import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    baseurl='http://localhost:8080/authorisation';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.baseurl}/users`);
    }

    register(user: User) {
        return this.http.get(`${this.baseurl}/add/${user.username}/${user.password}/${user.lastName}/${user.firstName}`);
    }

    delete(username: string) {
        return this.http.delete(`${this.baseurl}/delete/${username}`);
    }
}