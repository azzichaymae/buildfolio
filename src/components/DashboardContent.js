import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2"; // Import chart components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Dashboard.css";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashboardContent = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    views: 0,
    lastUpdated: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    progress: 0,
    skills: [],
  });
  const [formData, setFormData] = useState({
    skills: [],
  });

  const token = localStorage.getItem("token");
  const firstname = localStorage.getItem("firstname") || "";
  const lastname = localStorage.getItem("lastname") || "";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(response.data);
        setStats({
          totalProjects: response.data.length,
          views: response.data.reduce((sum, project) => sum + (project.views || 0), 0),
          lastUpdated:
            response.data.length > 0
              ? new Date(response.data[0].createdAt).toLocaleDateString()
              : "",
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [token]);

  const handleNewProject = () => {
    setIsModalOpen(true);
    setFormData({ skills: [] });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewProject({ title: "", description: "", progress: 0, skills: [] });
    setFormData({ skills: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: name === "progress" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, selectedSkill],
      }));
      setNewProject((prev) => ({
        ...prev,
        skills: [...prev.skills, selectedSkill],
      }));
      e.target.value = "";
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
    setNewProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/projects",
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects([...projects, response.data]);
      setStats({
        ...stats,
        totalProjects: stats.totalProjects + 1,
        views: stats.views + 1,
        lastUpdated: new Date(response.data.createdAt).toLocaleDateString(),
      });
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error creating project:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteProject = async () => {
    try {
      if (!token || !projectToDelete) {
        console.error("No token or project to delete");
        return;
      }

      await axios.delete(`http://localhost:8080/api/projects/${projectToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(projects.filter((project) => project.id !== projectToDelete.id));
      setStats({
        ...stats,
        totalProjects: stats.totalProjects - 1,
        views: stats.views - (projectToDelete.views || 0),
      });
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  // Prepare data for Skill Distribution chart
  

  // Prepare data for Project Status Breakdown chart
  const statusCounts = {
    "Not Started": projects.filter((p) => p.progress === 0).length,
    "In Progress": projects.filter((p) => p.progress > 0 && p.progress < 100).length,
    Completed: projects.filter((p) => p.progress === 100).length,
  };
  const statusLabels = Object.keys(statusCounts);
  const statusData = Object.values(statusCounts);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="dashboard-content min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <h2 className="text-lg text-gray-600">
          Welcome back, {lastname} {firstname}!
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Projects</h3>
          <p className="text-2xl font-semibold text-gray-900">{stats.totalProjects}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Views</h3>
          <p className="text-2xl font-semibold text-gray-900">{stats.views}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
          <p className="text-2xl font-semibold text-gray-900">{stats.lastUpdated}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <button
              className="text-purple-600 hover:text-purple-800 text-sm font-medium hover:underline transition-colors"
              onClick={handleNewProject}
            >
              New Project
            </button>
          </div>
          {projects.length > 0 ? (
            <div className="space-y-6">
              {projects.map((project) => {
                const dateProject = new Date(project.createdAt).toLocaleDateString();
                return (
                  <div
                    key={project.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 rounded-full px-3 py-1">
                          {dateProject}
                        </span>
                        <button
                          onClick={() => openDeleteModal(project)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-purple-600 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No projects available. Create one to get started!</p>
          )}
        </div>

        {/* Analytics Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
          {projects.length > 0 ? (
            <div className="space-y-6">
             

              {/* Project Status Breakdown Chart */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Project Status Breakdown</h3>
                {statusData.some((count) => count > 0) ? (
                  <div style={{ height: "200px" }}>
                    <Pie
                      data={{
                        labels: statusLabels,
                        datasets: [
                          {
                            label: "Project Status",
                            data: statusData,
                            backgroundColor: ["#EF4444", "#F59E0B", "#10B981"],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">No project status data available.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Add projects to see analytics.</p>
          )}
        </div>
      </div>

      {/* Modal for creating a new project */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 sm:mx-auto transform transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Briefly describe your project"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <div className="min-h-[40px] p-2 border border-gray-300 rounded-md mb-2 flex flex-wrap gap-2">
                  {formData.skills.length > 0 ? (
                    formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-purple-600 hover:text-purple-800 focus:outline-none text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs">No skills selected</p>
                  )}
                </div>
                <select
                  name="skills"
                  onChange={handleSkillChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                >
                  <option value="" disabled selected>
                    Select a skill
                  </option>
                  <option value="HTML/CSS">HTML/CSS</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Laravel">Laravel</option>
                  <option value="React">React</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Node.js">Node.js</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress (0-100)
                </label>
                <input
                  type="number"
                  name="progress"
                  value={newProject.progress}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4 sm:mx-auto transform transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Project</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{projectToDelete?.title}</span>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;