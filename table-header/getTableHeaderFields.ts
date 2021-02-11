import {TableHeaderFieldsInput, TableHeaderFieldsOutput, TableHeaderFieldType} from "./TableHeaderFields.types";
import {createHeaderField} from "./TableHeaderTools";

/**
 *  Run through nested table header Array, create readable, structured array of fields
 *  Create autoincrement [id] and add to each created field for ordering them in proper way
 * @param tableHeader: TableHeaderFieldsOutput[]
 * @return TableHeaderFieldsOutput[]
 */
export default function getTableHeaderFields(tableHeader: TableHeaderFieldsInput[]): TableHeaderFieldsOutput[] {

    const fields: TableHeaderFieldsOutput[] = [];

    // counter as id of field that hold order between fields keeping it as we got them from table header columns
    let counter = 0;

    (function run(tableHeader, parentName = '') {

        // hold child fields and their parent name
        let groupedField = {
            fields: [] as TableHeaderFieldsOutput[],
            name: parentName ?? ''
        };

        tableHeader.forEach((header) => {
            counter++;

            // this field contain at least one children field, so iterate through its child fields keeping its name as parent name
            if(header.children.length) {

                return run(header.children, header.text);
            }

            // this is child column which has parent must be added to grouped fields
            if(header.hasOwnProperty('type') && parentName) {

                groupedField.fields.push(createHeaderField(header.text, header.type, counter))
            }

            // this is top level column which does not have parent, just add it to fields
            else if(header.hasOwnProperty('type')) {

                fields.push(createHeaderField(header.text, header.type, counter));
            }

            // this column does not have any type, add it as hidden field with hidden type
            else {
                fields.push(createHeaderField(header.text, TableHeaderFieldType.HIDDEN, counter));
            }

        });

        // after iteration of current array, check if we have a grouped fields, if it has, add it to our main array of fields
        if(groupedField.fields.length) {
            fields.push(groupedField)
        }

        return fields;
    })(tableHeader);

    return fields;
}