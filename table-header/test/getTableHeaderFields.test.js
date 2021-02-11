import * as assert from "assert";
import dataCase1Out from "./case1/dataCase1Out";
import dataCase1In from "./case1/dataCase1In";
import getTableHeaderFields from "../getTableHeaderFields";
import dataCase2In from "./case2/dataCase2In";
import dataCase2Out from "./case2/dataCase2Out";

describe('It should create 2d array from of table header columns', () => {
    test('Case 1', () => {

        assert.deepStrictEqual(getTableHeaderFields(dataCase1In()), dataCase1Out());
    })

    test('Case 2', () => {

        assert.deepStrictEqual(getTableHeaderFields(dataCase2In()), dataCase2Out());
    })
})