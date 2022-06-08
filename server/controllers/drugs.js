import DrugModal from "../models/drug.js";
import mongoose from "mongoose";

// list of all endpoints


// list all drugs
//users/signin and signin name
export const getDrugs = async (req, res) => {
   try {  
      console.log('in getDrugs server controller ----')

      const drugs = await DrugModal.find();
      console.log(' drugs ', drugs)
      res.status(200).json(drugs);
   } catch(error) {
      res.status(404).json( {message: 'Can not find the drug'});
   }
}

//signup
export const createDrug = async (req, res) => {
   console.log('in createDrug server controller ----')
   console.log(req.body)
   const drugInput = req.body;
   const newDrug = new DrugModal(drugInput);
   try {
      await newDrug.save();
      res.status(201).json(newDrug);
   }catch(error) {
      res.status(409).json( {message: 'Unsuccessfull in creating a new drug'});
      console.log('errior---')
   }
}

export const deleteDrug = async (req, res) => {
   const { id } = req.params;
   try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ message: `No drug exist with id: ${id}` });
      }
      await DrugModal.findByIdAndRemove(id);
      res.json({ message: "Drug deleted successfully" });
   } catch(error) {
      res.status(404).json({ message: "Delete could not be performed.Something went wrong" });
   }
}

export const updateDrug = async (req, res) => {
   const { id } = req.params;
   const { name, description } = req.body;
   try {
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ message: `No drug exist with id: ${id}` });
     }
 
     const updatedDrug = {
       name,
       description,
       _id: id,
     };
     await DrugModal.findByIdAndUpdate(id, updatedDrug, { new: true });
     res.json(updatedDrug);
   } catch (error) {
     res.status(404).json({ message: "Something went wrong while updating" });
   }
 };

