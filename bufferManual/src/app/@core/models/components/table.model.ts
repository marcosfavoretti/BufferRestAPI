export interface tableColumns{
    alias: string;
    path: string;
    isImg?: boolean;
    isCheckBox?: boolean;
    toTotalize?: boolean;
}
export interface ghostControllColumn{
    path: string;
    desc: string;
    ifValueEqual?: any;
    ifValueGreater?: any;
    color: string;
}
export interface TableModel{
    title: string;
    paginator?: boolean;
    totalize: boolean;
    columns?: Array<tableColumns>;
    ghostControll?: Array<ghostControllColumn>
}