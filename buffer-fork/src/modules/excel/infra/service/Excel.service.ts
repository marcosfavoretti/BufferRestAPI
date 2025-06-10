import * as XLSX from 'xlsx';
/**
 * A service for handling Excel workbook operations.
 * Provides methods for creating, updating, and saving/downloading Excel files
 * in both Node.js and browser environments.
 */
export class ExcelService {

    /**
     * Creates a new workbook and adds a worksheet with the provided data.
     * Uses generics for improved type safety.
     *
     * @param data - Array of objects to be written to the sheet.
     * @param sheetName - The name for the new worksheet.
     * @returns A new XLSX.WorkBook instance.
     */
    createWorkbook<T extends object>(data: T[], sheetName: string): XLSX.WorkBook {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        return wb;
    }

    /**
     * Opens an existing workbook from a file path.
     * **Note: This method is for Node.js environments only.**
     *
     * @param filePath - The path to the Excel file.
     * @returns The loaded XLSX.WorkBook instance.
     */
    openWorkBook(filePath: string): XLSX.WorkBook {
        return XLSX.readFile(filePath, {
            cellNF: true, 
            cellStyles: true 
        });
    }


    /**
     * Checks if a worksheet with the given name exists in the workbook.
     *
     * @param wb - The workbook instance.
     * @param sheetName - The name of the worksheet to check.
     * @returns True if the worksheet exists, false otherwise.
     */
    sheetExists(wb: XLSX.WorkBook, sheetName: string): boolean {
        return Object.prototype.hasOwnProperty.call(wb.Sheets, sheetName);
    }

    /**
     * Efficiently appends new data to an existing worksheet.
     * If the sheet does not exist, it will be created.
     *
     * This method is more efficient than reading the entire sheet into memory,
     * as it appends data directly.
     *
     * @param wb - The workbook instance to be updated.
     * @param newData - The new array of objects to append.
     * @param sheetName - The name of the worksheet to update.
     * @returns The updated XLSX.WorkBook instance.
     */
    appendToSheet<T extends object>(wb: XLSX.WorkBook, newData: T[], sheetName: string): XLSX.WorkBook {
        // Find the sheet, or create a new one if it doesn't exist.
        let ws = wb.Sheets[sheetName];
        if (!ws) {
            ws = XLSX.utils.json_to_sheet([]); // Create an empty sheet to get headers right
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        }
        XLSX.utils.sheet_add_json(ws, newData);

        return wb;
    }

    /**
     * Appends new data to the end of an existing worksheet, preserving existing rows.
     * If the worksheet does not exist, it will be created.
     *
     * @param wb - The workbook instance to be updated.
     * @param newData - The new array of objects to append.
     * @param sheetName - The name of the worksheet to update.
     * @returns The updated XLSX.WorkBook instance.
     */
    appendDataToEnd<T extends object>(wb: XLSX.WorkBook, newData: T[], sheetName: string): XLSX.WorkBook {
        let ws = wb.Sheets[sheetName];
        if (!ws) {
            ws = XLSX.utils.json_to_sheet(newData);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
            return wb;
        }
        // Find the last row
        const range = XLSX.utils.decode_range(ws['!ref'] as string);
        const startRow = range.e.r + 1;
        XLSX.utils.sheet_add_json(ws, newData, { skipHeader: true, origin: { r: startRow, c: 0 } });
        return wb;
    }

    /**
     * Saves the workbook to a file on the server's file system.
     * **Note: This method is for Node.js environments only.**
     *
     * @param wb - The workbook to save.
     * @param filePath - The full path and filename (e.g., './output/report.xlsx').
     */
    saveToFile(wb: XLSX.WorkBook, filePath: string): void {
        // The 'type' option is set to 'buffer' for better performance and compatibility.
        XLSX.writeFile(wb, filePath, { bookType: 'xlsx', type: 'buffer' });
    }

    /**
     * Triggers a file download in the user's browser.
     * **Note: This method is for browser environments (e.g., Angular, React) only.**
     *
     * @param wb - The workbook to download.
     * @param fileName - The desired filename for the download (e.g., 'report.xlsx').
     */
    downloadAsBrowserFile(wb: XLSX.WorkBook, fileName: string): void {
        // The write function for browsers triggers a download
        XLSX.writeFile(wb, fileName);
    }

    /**
     * A static utility method to quickly export an array of objects to an Excel file.
     * This is a convenient one-liner for the most common use case.
     *
     * @param data - The array of objects to export.
     * @param fileName - The desired filename for the download (e.g., 'report.xlsx').
     * @param sheetName - The name for the worksheet.
     */
    static exportAsFile<T extends object>(data: T[], fileName: string, sheetName: string = 'Sheet1'): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, fileName);
    }
}
