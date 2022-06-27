const Employee = require('./Employee.js');

class Manager extends Employee {
    constructor(name, employeeId, email, officeNumber) {
        super(name, employeeId, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;