import React from "react";
import "../styles/Dashboard.css";
const ProjectCard = ({ title, views, onView, onEdit }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>Views: {views}</p>
      <div className="card-actions">
        <button className="button small" onClick={onView}>View</button>
        <button className="button small" onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default ProjectCard;