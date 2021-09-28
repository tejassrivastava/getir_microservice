import * as mongoose from "mongoose";

const recordsSchema = new mongoose.Schema({
    
    key: String,
    createdAt: Date,
    totalCount: Array

});

module.exports = mongoose.model("records", recordsSchema);