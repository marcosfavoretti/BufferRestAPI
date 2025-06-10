import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ResSetorDTO } from "../../api";

@Injectable({
    providedIn: 'root'
})
export class SetorStoreService {
    private currentSetorSubject = new BehaviorSubject<ResSetorDTO | undefined>(undefined);
    public currentSetor$ = this.currentSetorSubject.asObservable();

    public get currentSetor(): ResSetorDTO | undefined {
        return this.currentSetorSubject.value;
    }

    public set currentSetor(value: ResSetorDTO) {
        this.currentSetorSubject.next(value);
    }
}