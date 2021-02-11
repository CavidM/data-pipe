import {TableHeaderFieldsOutput, TableHeaderFieldType} from "./TableHeaderFields.types";

export const createHeaderField = (name: string, type: TableHeaderFieldType, id: number): TableHeaderFieldsOutput => {
    return {
        name, type, id
    }
}