// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");


class Manager extends Employee {

    constructor(name, id, email, officeNumber, role) {
        super(name,id,email);
        this.officeNumber = officeNumber;
        this.role = role;
        this.role =  'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
};

module.exports = Manager;