// Define table header entity getting from external resource
export interface TableHeaderFieldsInput {

    // column header name
    text?: string;

    type?: TableHeaderFieldType;

    // hold nested column header elements
    children?: TableHeaderFieldsInput[]
}

// Define table header entity which will transformed form output and will process by rendering part
export interface TableHeaderFieldsOutput {

    //field name
    name?: string;

    type?: TableHeaderFieldType;

    // unique id for keeping fields in right order
    id?: number;

    // hold grouped fields under the same parent
    fields?: TableHeaderFieldsOutput[]
}

// Represent table row entity
export interface TableBodyRow {

    value: string
}

export enum TableHeaderFieldType {
    INTEGER = "int",
    FLOAT = "float",
    STRING = "string",
    DATE = "date",
    HIDDEN = 'hidden'
}