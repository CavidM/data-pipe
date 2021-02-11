import groupTable from "../groupTable";
import * as assert from "assert";
import dataCase1In from "./case1/dataCase1.in";
import dataCase1Out from "./case1/dataCase1.out";
import dataCase2In from "./case2/dataCase2.in";
import dataCase2Out from "./case2/dataCase2.out";

describe('This should be group (join) table same columns', () => {
    test('test case 1', async () => {

        assert.deepStrictEqual(groupTable(dataCase1In(), 'value'), dataCase1Out());
    });

    test('test case 2', async () => {

        assert.deepStrictEqual(groupTable(dataCase2In(), 'value'), dataCase2Out());
    });
})