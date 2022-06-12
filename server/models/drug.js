import mongoose  from "mongoose";

// create schema

const drugSchema = mongoose.Schema({
   name: {
      type: String, 
      required: true
   },
   rxnormId: String,
   description: String,
   direction: String,
   strength: String,
   createdAt: {
      type: Date,
      default: new Date()
   },
   id: { type: String }
});

const Drug = mongoose.model('Drug', drugSchema);

export default Drug;