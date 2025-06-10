import * as ExcelJS from 'exceljs';

export class ExcelService {
    /**
     * Cria um novo workbook e adiciona uma worksheet com os dados fornecidos.
     * 
     * @param data - Array de objetos a serem escritos.
     * @param sheetName - Nome da nova aba.
     */
    async createWorkbook<T extends object>(data: T[], sheetName: string): Promise<ExcelJS.Workbook> {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(sheetName);

        if (data.length > 0) {
            sheet.columns = Object.keys(data[0]).map(key => ({
                header: key,
                key,
                width: 20
            }));

            data.forEach(item => {
                sheet.addRow(item);
            });
        }

        return workbook;
    }

    /**
     * Abre um arquivo Excel existente com estilos preservados.
     * 
     * @param filePath - Caminho do arquivo.
     */
    async openWorkBook(filePath: string): Promise<ExcelJS.Workbook> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook;
    }

    /**
     * Verifica se uma aba existe.
     */
    sheetExists(workbook: ExcelJS.Workbook, sheetName: string): boolean {
        return workbook.getWorksheet(sheetName) !== undefined;
    }

    /**
     * Adiciona dados a uma aba existente, criando-a se necessário.
     */
    appendToSheet<T extends object>(workbook: ExcelJS.Workbook, data: T[], sheetName: string): ExcelJS.Workbook {
        let sheet = workbook.getWorksheet(sheetName);
        if (!sheet) {
            sheet = workbook.addWorksheet(sheetName);
            sheet.columns = Object.keys(data[0] || {}).map(key => ({
                header: key,
                key,
                width: 20
            }));
        }

        data.forEach(item => {
            sheet!.addRow(item);
        });

        return workbook;
    }

    /**
     * Adiciona dados ao final da aba existente (sem cabeçalhos).
     */
    appendDataToEnd<T extends object>(workbook: ExcelJS.Workbook, data: T[], sheetName: string): ExcelJS.Workbook {
        let sheet = workbook.getWorksheet(sheetName);
        if (!sheet) {
            sheet = workbook.addWorksheet(sheetName);
            sheet.columns = Object.keys(data[0] || {}).map(key => ({
                header: key,
                key,
                width: 20
            }));
        }

        data.forEach(item => {
            sheet!.addRow(item);
        });

        return workbook;
    }

    /**
     * Salva o workbook como um arquivo local.
     */
    async saveToFile(workbook: ExcelJS.Workbook, filePath: string): Promise<void> {
        await workbook.xlsx.writeFile(filePath);
    }

    /**
     * Exporta diretamente um arquivo com dados (browser não suportado aqui).
     */
    static async exportAsFile<T extends object>(data: T[], filePath: string, sheetName: string = 'Sheet1'): Promise<void> {
        const service = new ExcelService();
        const workbook = await service.createWorkbook(data, sheetName);
        await workbook.xlsx.writeFile(filePath);
    }
}
