"use strict";

const Company = require("../../../models/company/company");
const ErrorResult = require("../../../helpers/error.result");

module.exports = (req, res) => {
    try {
        let company = req.body.data;
        delete company._id;

        Company
            .FindOneByCompanyName(company.companyNamae)
            .then((result) => {
                if (!result.success)
                    return new Company(company).Add();

                res.send(ErrorResult("the company already exists"));
            })
            .then((result) => res.send(result))
            .catch((error) => res.send(ErrorResult(error)));
    } catch (e) {
        res.send(ErrorResult(e));
    }
};