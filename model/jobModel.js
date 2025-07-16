import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  requiredSkills: { type: String, required: true },
  minExperience: { type: Number, required: true },
  location: { type: String, required: true },
  company: { type: String, required: true },
});

const JobModel = mongoose.model("Job", jobSchema);

export default JobModel;
