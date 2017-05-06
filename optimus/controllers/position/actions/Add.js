"use strict";

const Position = require("../../../models/position/position");
const ErrorResult = require("../../../helpers/error.result");

module.exports = (req, res) => {
    try {
        let position = req.body.data;

        Position
            .FindOneByPositionName(position.positionName)
            .then((result) => {
                if (!result.success) {
                    return new Position(position).Add();
                }
                res.send(ErrorResult("position name is already existing"));
            })
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(ErrorResult(error));
            });
    } catch (e) {
        res.send(ErrorResult(e));
    }
};