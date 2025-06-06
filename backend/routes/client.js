const express = require('express');
const router = express.Router();
const passport = require('passport');

const ClientProfile = require('../models/ClientProfile');
const Project = require('../models/Project');
const User = require('../models/User');

// POST /client/profile (Create or Update client profile)
router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { company, website, description } = req.body;

      if (req.user.role !== 'client') {
        return res.status(403).json({ error: 'Only clients can access this route' });
      }

      const profile = await ClientProfile.findOne({ user: req.user._id }).populate('user', 'name');

      if (profile) {
        profile.company = company;
        profile.website = website;
        profile.description = description;
        await profile.save();
        return res.json({ message: 'Client profile updated successfully', profile });
      }

      profile = new ClientProfile({
        user: req.user._id,
        company,
        website,
        description
      });

      await profile.save();
      res.json({ message: 'Client profile created successfully', profile });
    } catch (err) {
      console.error('Client profile error:', err.message);
      res.status(500).json({ error: 'Server error while saving client profile' });
    }
  }
);

// PUT /client/profile (Update client profile)
router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { company, website, description } = req.body;

      if (req.user.role !== 'client') {
        return res.status(403).json({ error: 'Only clients can access this route' });
      }

      const profile = await ClientProfile.findOne({ user: req.user._id });

      if (!profile) {
        return res.status(404).json({ error: 'Client profile not found' });
      }

      profile.company = company;
      profile.website = website;
      profile.description = description;
      await profile.save();

      res.json({ success: true, message: 'Client profile updated successfully', profile });
    } catch (err) {
      console.error('Update client profile error:', err.message);
      res.status(500).json({ error: 'Server error while updating client profile' });
    }
  }
);

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.role !== 'client') return res.status(403).json({ error: 'Only clients' });
  const profile = await ClientProfile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

// PUT /client/project/:id (Update existing project)
router.put(
  '/project/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, requiredSkills, domain, timeline, budget } = req.body;

      if (req.user.role !== 'client') {
        return res.status(403).json({ error: 'Only clients can update projects' });
      }

      const project = await Project.findOne({ _id: id, client: req.user._id });

      if (!project) {
        return res.status(404).json({ error: 'Project not found or unauthorized' });
      }

      project.title = title ?? project.title;
      project.description = description ?? project.description;
      project.requiredSkills = requiredSkills ?? project.requiredSkills;
      project.domain = domain ?? project.domain;
      project.timeline = timeline ?? project.timeline;
      project.budget = budget ?? project.budget;

      await project.save();
      res.json({ message: 'Project updated successfully', project });
    } catch (err) {
      console.error('Project update error:', err.message);
      res.status(500).json({ error: 'Error updating project' });
    }
  }
);

// POST /client/project (Post a new project)
router.post(
  '/project',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { title, description, requiredSkills, domain, timeline, budget } = req.body;

      if (req.user.role !== 'client') {
        return res.status(403).json({ error: 'Only clients can post projects' });
      }

      const project = new Project({
        client: req.user._id,
        title,
        description,
        requiredSkills,
        domain,
        timeline,
        budget
      });

      await project.save();
      res.json({ message: 'Project posted successfully', project });
    } catch (err) {
      console.error('Project post error:', err.message);
      res.status(500).json({ error: 'Server error while posting project' });
    }
  }
);

router.get('/projects/recent', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('client', 'name'); // assuming Project model has a client ref

    res.json(recentProjects);
  } catch (err) {
    console.error('Failed to fetch recent projects', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /client/projects (Get all projects by the logged-in client)
router.get(
  '/projects',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== 'client') {
        return res.status(403).json({ error: 'Only clients can access their projects' });
      }

      const projects = await Project.find({ client: req.user._id }).sort({ createdAt: -1 });
      res.json({ projects });
    } catch (err) {
      console.error('Get projects error:', err.message);
      res.status(500).json({ error: 'Error fetching projects' });
    }
  }
);

// DELETE /client/project/:id (Delete a specific project)
router.delete(
  '/project/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (req.user.role !== 'client') {
        return res.status(403).json({ error: 'Only clients can delete projects' });
      }

      const deleted = await Project.findOneAndDelete({ _id: id, client: req.user._id });

      if (!deleted) {
        return res.status(404).json({ error: 'Project not found or unauthorized' });
      }

      res.json({ message: 'Project deleted successfully' });
    } catch (err) {
      console.error('Delete project error:', err.message);
      res.status(500).json({ error: 'Error deleting project' });
    }
  }
);

// ✅ Get all clients
router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password'); // exclude password
    res.json(clients);
  } catch (err) {
    console.error('Fetch clients error:', err.message);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});
module.exports = router;