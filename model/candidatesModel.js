import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  skills: { type: [String], required: true },
  experience: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
