import React, { useState, useEffect } from "react";
import axios from "axios";
import AnalyticsWidget from "../components/AnalyticsWidget";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: 0,
  });

  const token = localStorage.getItem("token");

  // Fetch skills from the database
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/users/skills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSkills(response.data); // Array of { id, name, proficiency, user }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, [token]);

  // Open/close modal
  const handleAddSkill = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSkill({ name: "", proficiency: 0 });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({
      ...prev,
      [name]: name === "proficiency" ? parseInt(value) || 0 : value,
    }));
  };

  // Save new skill to the database
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/users/skills",
        [{ name: newSkill.name, proficiency: newSkill.proficiency }],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkills([...skills, ...response.data]);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  return (
    <main className="max-w-auto mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold mb-1">Skills</h1>
      <p className="text-slate-500 mb-6">Manage your professional skills</p>
      
      {/* Button to open modal */}
      <button
        className="text-purple-600 text-sm font-medium hover:underline mb-6"
        onClick={handleAddSkill}
      >
        Add New Skill
      </button>

      {/* Pass skills to AnalyticsWidget */}
      <AnalyticsWidget skills={skills} />

      {/* Modal for adding a new skill */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
            <form onSubmit={handleSaveSkill}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name
                </label>
                <select
                  name="name"
                  value={newSkill.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="" disabled>
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency (0-100)
                </label>
                <input
                  type="number"
                  name="proficiency"
                  value={newSkill.proficiency}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-200"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Skills;