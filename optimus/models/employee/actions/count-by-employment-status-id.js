"use strict";

const Promise = require("bluebird");
const EmployeeModel = require("../employee.model");

module.exports = CountByEmploymentStatusId;

function CountByEmploymentStatusId(employmentStatusId) {
    return new Promise((resolve, reject) => {
        let promise = EmployeeModel.count({ employmentStatus: employmentStatusId }).exec();

        promise.then((count) => {
            resolve(count);
        }).catch((error) => {
            reject(error);
        });
    });
}

