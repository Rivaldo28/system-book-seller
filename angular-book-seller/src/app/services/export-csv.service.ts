import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportCSVService {

    private csvTryQuote(data: any): string {
        const value = data === null || data === undefined ? '' : String(data);
        // Se o valor contém o separador, quebra de linha ou aspas, ele precisa ser encapsulado em aspas.
        if (value.includes(';') || value.includes('\n') || value.includes('"')) {
            // Aspas dentro do valor são duplicadas, conforme o padrão CSV.
            return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    }

    private toCsv(header: string[], dados: any[][]): string {
        let csv = '\ufeff'; // BOM para garantir a codificação UTF-8 correta no Excel
        const csvSeparator = ';'; // Usando ponto e vírgula para melhor compatibilidade com Excel no Brasil

        // 1. Cabeçalho da Tabela
        csv += header.map(h => this.csvTryQuote(h)).join(csvSeparator) + '\n';

        // 2. Dados da Tabela (Lógica Correta)
        dados.forEach(row => {
            csv += row.map(cell => this.csvTryQuote(cell)).join(csvSeparator) + '\n';
        });

        return csv;
    }

    private export(data: string, mimeTypeAndCharset: string, filename: string): void {
        const blob = new Blob([data], {
            type: mimeTypeAndCharset
        });

        const nav = (window.navigator as any);
        if (nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', filename);
                link.click();
            }
            else {
                const encodedUri = 'data:' + mimeTypeAndCharset + ',' + encodeURIComponent(data);
                window.open(encodedUri);
            }
            document.body.removeChild(link);
        }
    }

    public exportCsv(header: string[], dados: any[][], filename: string): void {
        const csv = this.toCsv(header, dados);
        this.export(csv, 'text/csv;charset=utf-8;', filename);
    }
}
