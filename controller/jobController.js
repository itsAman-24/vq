import JobModel from "../model/jobModel.js";
import CandidateModel from "../model/candidatesModel.js";

async function getJobController(req, res) {
  try {
    console.log("req body is", req.body);
    const jobId = req.body.jobId;

    // console.log(jobId);
    console.log(typeof jobId);

    if (!jobId) {
      console.log("No jobId found");
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      console.log("No job found");
      return res.status(404).json({ error: "Job not found" });
    }

    const jobSkills = Array.isArray(job.requiredSkills)
      ? job.requiredSkills
      : job.requiredSkills.split(",").map((skill) => skill.trim());

    const candidates = await CandidateModel.find();

    const matchedCandidates = candidates
      .map((candidate) => {
        const matchedSkills = candidate.skills.filter(
          (skill) => jobSkills.includes(skill)            // getting all the matching skills from the jobSkills
        );
        const matchedSkillsCount = matchedSkills.length;
        const isSameLocation = candidate.location == job.location;

        return {
          name: candidate.name,
          skills: candidate.skills,
          experience: candidate.experience,
          location: candidate.location,
          matchedSkillsCount,
          isSameLocation,
        };
      })
      .filter((candidate) => candidate.experience >= job.minExperience)
      .sort((a, b) => {
        if (b.matchedSkillsCount !== a.matchedSkillsCount) {
          return b.matchedSkillsCount - a.matchedSkillsCount;
        }
        return b.experience - a.experience;
      })
      .slice(0, 4);

    return res.json({
      job: {
        title: job.title,
        company: job.company,
      },
      matchedCandidates,
    });
  } catch (error) {
    console.error("Error in the Job Controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export default getJobController;

