import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { BufferHistDto } from "../@core/models/res/BufferHistDto";
import { Client } from "../@core/const/client";
import { Item } from "../@core/models/res/Item";
import {
    bufferControllerConsultBufferMethod,
    excelControllerCompactBuffer2ExcelMethod,
    ResMercadosIntermediarioDoSetorDTO,
    ResSetorDTO,
    SaveBufferLogDto,
    setoresControllerGetSetoresMethod,
    setoresControllerGetSetorMercadoMethod
} from "../../api";
import { format } from "date-fns";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    requestSetores(): Observable<ResSetorDTO[]> {
        return from(
            setoresControllerGetSetoresMethod()
        )
    }

    requestHistorico(start: Date, end?: Date): Observable<any[]> {
        return from(
            bufferControllerConsultBufferMethod({
                startDate: format(start, 'dd-MM-yyyy'),
                endDate: end && format(end, 'dd-MM-yyyy')
            }).then(d => d)
        )
    }

    syncExcel(): Observable<void> {
        return from(
            excelControllerCompactBuffer2ExcelMethod()
        )
    }

    requestMercadoInfo(setorid: number, dia: string): Observable<ResMercadosIntermediarioDoSetorDTO[]> {
        return from(
            setoresControllerGetSetorMercadoMethod(setorid, dia)
        )
    }

    saveLog(dto: SaveBufferLogDto): Observable<BufferHistDto> {
        return from(
            Client.post('/buffer', dto)
                .then(res => res.data)
        )
    }

    requestItem110(): Observable<Item[]> {
        return from(
            Client.get<Item[]>('/item')
                .then(res => res.data)
        )
    }
    requestItem000(): Observable<Item[]> {
        return from(
            Client.get<Item[]>('/item')
                .then(res => res.data)
        )
    }
}