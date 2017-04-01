"use strict";

const Promise = require("bluebird");
const EmployeeModel = require("../employee.model");

module.exports = CountByWorkHistoryEmploymentStatusId;

function CountByWorkHistoryEmploymentStatusId(employmentStatusId) {
    return new Promise((resolve, reject) => {
        let promise = EmployeeModel.count({ workHistory: { employmentStatus: employmentStatusId } }).exec();

        promise.then((count) => {
            resolve(count);
        }).catch((error) => {
            reject(error);
        });
    });
}