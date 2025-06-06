// components/ProjectCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${project._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all border mb-4"
    >
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Skills:</strong> {project.requiredSkills.join(', ')}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Timeline:</strong> {project.timeline}
      </p>
    </div>
  );
};

export default ProjectCard;