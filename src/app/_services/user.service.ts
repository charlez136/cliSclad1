import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.baseurlauth}/users`);
    }

    register(user: User) {
        return this.http.get(`${environment.baseurlauth}/add/${user.username}/${user.password}/${user.lastName}/${user.firstName}`);
    }

    delete(username: string) {
        return this.http.delete(`${environment.baseurlauth}/delete/${username}`);
    }
}