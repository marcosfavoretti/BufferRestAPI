import { ConsultarBufferCompactadoDTO } from "src/delivery/controller/dto/ConsultarBufferHistorico.dto";
import { CompactBuffer } from "../@core/class/CompactBuffer";
import { Inject } from "@nestjs/common";
import { CompactBufferDataService } from "../infra/service/CompactBufferData.service";

export class ConsultarBufferCompactadoUseCase {
    constructor(@Inject(CompactBufferDataService) private compactbuffer: CompactBufferDataService) { }
    async consultar(dto: ConsultarBufferCompactadoDTO): Promise<CompactBuffer[]> {
        return await this.compactbuffer.compact(dto.startDate, dto.endDate);
    }
}