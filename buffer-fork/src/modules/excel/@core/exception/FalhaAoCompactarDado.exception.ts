export class FalhaAoCompactarDadoException extends Error{
    constructor(){
        super('Falha ao compactar dados para gerar excel');
    }
}