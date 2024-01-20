const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var support_Ticket_schema = new Schema({
    topic: {
        type: String,
    },
    severity_level: {
        type: String,
    },
    ticket_type: {
        type: String,
    },
    assignedTo: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["New", "Assigned", "Resolved"],
        default: "New"     
    },
    resolvedOn:{
        type: Date,
    }
}, 
{
    timestamps: true
});


const Support_Ticket = mongoose.model('Support_Ticket', support_Ticket_schema);
module.exports = Support_Ticket;