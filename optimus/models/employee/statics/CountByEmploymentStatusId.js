"use strict";

const Promise = require("bluebird");

module.exports = Promise.method(CountByEmploymentStatusId);

function CountByEmploymentStatusId(employmentStatusId) {
    return new Promise((resolve, reject) => {
        this
            .count({ employmentStatus: employmentStatusId })
            .exec()
            .then((count) => resolve(count))
            .catch((error) => reject(error));
    });
}
