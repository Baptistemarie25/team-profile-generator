const { default: test } = require('node:test');
const { describe } = require('yargs');
const Employee = require('../lib/Employee.js');

describe ('Employee', () =>{
    describe('getId', () => {
        it('should return the Id property', () => {
            const employee = new Employee(id);
            expect(employee.getId()).tobe(employee.id);
        });
    });
});