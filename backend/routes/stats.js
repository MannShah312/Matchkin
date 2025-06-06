const express = require("express");
const router = express.Router();
const ConsultantProfile = require("../models/ConsultantProfile");

// GET /stats/skills – Returns count of each skill
router.get("/skills", async (req, res) => {
  try {
    const allProfiles = await ConsultantProfile.find();

    const skillCounts = {};
    allProfiles.forEach(profile => {
      profile.skills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });

    res.json(skillCounts);
  } catch (err) {
    res.status(500).json({ error: "Failed to count skills" });
  }
});

// GET /stats/domains – Returns count of each domain
router.get("/domains", async (req, res) => {
  try {
    const allProfiles = await ConsultantProfile.find();

    const domainCounts = {};
    allProfiles.forEach(profile => {
      const domain = profile.domain;
      if (domain) {
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      }
    });

    res.json(domainCounts);
  } catch (err) {
    res.status(500).json({ error: "Failed to count domains" });
  }
});

module.exports = router;