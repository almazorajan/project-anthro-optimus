"use strict";

const OptimusCon = require("../../optimus.con");

const UserTemplate = {
    userName: { 
        type: String, 
        trim: true 
    },
    firstName: { 
        type: String, 
        trim: true,
    },
    middleName: { 
        type: String, 
        trim: true
    },
    lastName: { 
        type: String, 
        trim: true 
    },
    password: { 
        type: String, 
        trim: true 
    },
    salt: {
        type: String
    },
    dateCreated: { 
        type: Date, 
        default: Date.now 
    },
    dateUpdated: { 
        type: Date, 
        default: Date.now 
    },
    position: {
        type: OptimusCon.Schema.ObjectId,
        ref: "Position"
    },
    dateDeactivated: { 
        type: Date 
    }
};

module.exports = UserTemplate;