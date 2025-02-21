import { Injectable } from "@angular/core";
import { SaveBufferHistDto } from "../@core/models/req/SaveBufferHistDto";
import { from, Observable } from "rxjs";
import { BufferHistDto } from "../@core/models/res/BufferHistDto";
import { Client } from "../@core/const/client";
import { Item } from "../@core/models/res/Item";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    saveLog(dto: SaveBufferHistDto): Observable<BufferHistDto> {
        return from(
            Client.post('/buffer', dto)
                .then(res => res.data)
        )
    }

    requestItem(): Observable<Item[]> {
        return from(
            Client.get<Item[]>('/item')
                .then(res => res.data)
        )
    }
}