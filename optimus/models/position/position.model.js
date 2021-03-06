"use strict";

const Promise = require("bluebird");
const OptimusCon = require("../../optimus.con.js");
const Result = require("../../classes/result.js");
const PositionModel = OptimusCon.model("Position", require("./position.schema.js"));

module.exports = {
    PositionModel: PositionModel,
    GetAll: GetAll,
    CountByModuleId: CountByModuleId,
    FindOneByIdAndPositionName: FindOneByIdAndPositionName,
    FindOneByPositionName: FindOneByPositionName,
    Add: Add,
    UpdateById: UpdateById,
    DeleteById: DeleteById
};

function GetAll() {
    return new Promise((resolve, reject) => {
        let result = new Result();
        let promise = PositionModel.find({}).populate("modules").exec();

        promise.then((positions) => {
            result.success = true;

            if (positions.length)
                result.message = "Successfully loaded all Positions";
            else
                result.message = "No Position loaded";

            result.data = positions;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function CountByModuleId(moduleId) {
    return new Promise((resolve, reject) => {
        let promise = PositionModel.count({ modules: moduleId }).exec();

        promise.then((count) => {  
            resolve(count);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function FindOneByIdAndPositionName(_position) {
    return new Promise((resolve, reject) => {
        let result = new Result();
        let promise = PositionModel.findOne({ 
            _id: _position._id, 
            positionName: _position.positionName 
        }).exec();

        promise.then((_position) => {
            if (_position) {
                result.success = true;
                result.message = "Found a record match";
            } else {
                result.success = false;
                result.message = "Could not find a record match";
            }

            result.data = _position;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function FindOneByPositionName(_position) {
    return new Promise((resolve, reject) => {
        let result = new Result();
        let promise = PositionModel.findOne({ positionName: _position.positionName }).exec();

        promise.then((_position) => {
            if (_position) {
                result.success = true;
                result.message = "Found matching record";
            } else {
                result.success = false;
                result.message = "Unable to find matching record";
            }

            result.data = _position;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

// private
function GetModuleIds(_position) {
    if (_position.modules.length) {
        let ids = [];

        for (let i = 0; i < _position.modules.length; i++) {
            ids.push(_position.modules[i]._id);
        }

        return ids;
    }
}

function Add(_position) {
    return new Promise((resolve, reject) => {
        if (_position.hasOwnProperty("_id")) {
            delete _position._id;    
        }

        _position.modules = GetModuleIds(_position);
        let result = new Result();
        let promise = new PositionModel(_position).save();

        promise.then((position) => {
            if (position) {
                result.success = true;
                result.message = "Successfully added Position";
            } else {
                result.success = false;
                result.message = "Unable to save Position";
            }

            result.data = position;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function UpdateById(_position) {
    return new Promise((resolve, reject) => {
        _position.modules = GetModuleIds(_position);
        let result = new Result();
        let promise = PositionModel.update({
            _id: _position._id
        }, {
            positionName: _position.positionName,
            modules: _position.modules
        }).exec();

        promise.then((dbRes) => {
            if (dbRes.n === 1) {
                result.success = true;
                result.message = "Position was successfully updated";
            } else {
                result.success = false;
                result.message = "Position was not updated";
            }

            result.data = dbRes;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function DeleteById(_position) {
    return new Promise((resolve, reject) => {
        let result = new Result();
        let promise = PositionModel.findById({ _id: _position._id }).remove().exec();

        promise.then((dbRes) => {
            if (dbRes.result.n === 1) {
                result.success = true;
                result.message = "Position was successfully deleted";
            } else {
                result.success = false;
                result.message = "Unable to delete the Position";
            }

            result.data = dbRes;
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}