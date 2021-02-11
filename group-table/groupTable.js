/**
 *
 * @param stack
 * @param elem
 * @returns {*}
 * Check and return existed element from stack of repeated elements
 */
function elemExists(stack, elem) {
    return stack.find((item) => {
        return item.key === elem.key && item.value === elem.value;
    });
}

export default function groupTable(body, rowAccess = '') {
    let groupedTable = [];

    // Hold stack of repeated elements
    let stack = [];

    // Hold the length of new grouped array
    let length = 0;
console.log(body);
    body.forEach((row, rowIndex) => {

        let tableRow = rowAccess ? row[rowAccess] : row;

        let groupedRow = tableRow.map((cell, cellIndex) => {

            // Run after first iteration through rows
            if (length) {

                // Hold information about cell and its row index
                const elem = {
                    rowIndex: rowIndex,
                    key: cellIndex,
                    value: cell.value
                };

                // Check if this element exists in repeated elements of stack
                let stackExists = elemExists(stack, elem);

                // console.log(groupedTable)
                // If current cell does not match previous cell and exists in stack then remove it from stack
                if (
                    !(cell.value === groupedTable[length - 1][rowAccess][cellIndex]['value']) &&
                    stackExists &&
                    stackExists['key'] === cellIndex &&
                    stackExists['value'] === cell.value
                ) {
                    stack = stack.filter((item) => {
                        return !(item.row === stackExists.row && item.key === stackExists.key);
                    });
                }

                // Check stack again for refreshing its value
                stackExists = elemExists(stack, elem);

                /**
                 * If current cell exists in stack:
                 * - remove current cell (empty => true: indicate not to show this cell, just skip in further processing) from groupedTable
                 * - find first repeated cell in grouped table and increase its row span. It means it will hold more space including current cell.
                 */
                if (
                    stackExists &&
                    stackExists['key'] === cellIndex &&
                    stackExists['value'] === cell.value
                ) {
                    groupedTable[stackExists['row']][rowAccess][cellIndex]['rowSpan'] =
                        !groupedTable[stackExists['row']][rowAccess][cellIndex]['rowSpan'] &&
                        groupedTable[stackExists['row']][rowAccess][cellIndex]['rowSpan'] !== 0
                            ? 2
                            : (groupedTable[stackExists['row']][rowAccess][cellIndex]['rowSpan'] += 1);

                    return {
                        empty: true,
                        ...cell
                    };
                }

                /**
                 * If current cell match previous cell:
                 * - put previous cell to stack (it will behave as main cell in processing)
                 * - increase previous cell row span
                 * - add empty flag to current cell
                 */
                if (cell.value === groupedTable[length - 1][rowAccess][cellIndex]['value']) {

                    stack.push({
                        row: length - 1,
                        key: cellIndex,
                        value: cell.value
                    });

                    groupedTable[length - 1][rowAccess][cellIndex]['rowSpan'] =
                        !groupedTable[length - 1][rowAccess][cellIndex]['rowSpan'] && groupedTable[length - 1][rowAccess][cellIndex]['rowSpan'] !== 0
                            ? 2
                            : (groupedTable[length - 1][rowAccess][cellIndex]['rowSpan'] += 1);

                    return {
                        empty: true,
                        ...cell
                    };
                }
            }

            return {
                ...cell
            };
        });

        length = groupedTable.push({
            ...row,
            value: [...groupedRow]
        });
    });

    return groupedTable;
}