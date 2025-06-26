import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem("firstname") || "",
    lastName: localStorage.getItem("lastname") || "",
    email: decodedToken.email || "",
     
    professionalTitle: "",
    bio: "",
    
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // For success/error messages

  // Fetch initial profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setMessage({ text: "No token found. Please log in.", type: "error" });
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName || prev.firstName,
          lastName: data.lastName || prev.lastName,
          email: data.email || prev.email,
          professionalTitle: data.professionalTitle || "",
          bio: data.bio || "",
         
        }));
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
       
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToSend = new FormData();
    formDataToSend.append("profilePicture", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/users/profile-picture",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData((prev) => ({
        ...prev,
        profilePicture: response.data.profilePicture || prev.profilePicture,
      }));
      setMessage({ text: "Profile picture updated successfully!", type: "success" });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      
    } finally {
      setLoading(false);
    }
  };

  // Handle profile picture removal
  const handlePictureRemove = async () => {
    try {
      setLoading(true);
      await axios.delete("http://localhost:8080/api/users/profile-picture", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData((prev) => ({
        ...prev,
        profilePicture: "https://storage.googleapis.com/a1aa/image/28de9a53-dc8c-4ae3-b17a-5acd139beb18.jpg", // Default image
      }));
      setMessage({ text: "Profile picture removed successfully!", type: "success" });
    } catch (error) {
      console.error("Error removing profile picture:", error);
      setMessage({ text: "Failed to remove profile picture.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put("http://localhost:8080/api/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("firstname", formData.firstName);
      localStorage.setItem("lastname", formData.lastName);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setMessage({ text: "Failed to update profile.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Profile</h1>
      <p className="text-gray-500 mb-8 text-lg">Manage your personal information</p>
      {message.text && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      {loading && <div className="mb-4 text-gray-600">Loading...</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Section */}
        <section className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          <form className="space-y-6" onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="professionalTitle">
                Professional Title
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                id="professionalTitle"
                name="professionalTitle"
                type="text"
                value={formData.professionalTitle}
                onChange={handleInputChange}
                placeholder="Enter your professional title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bio">
                Bio
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-y"
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Write a short bio about yourself"
              />
            </div>
            
            <button
              className="inline-block rounded-md btn btn-sm bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 text-white font-medium text-base hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </section>

      
<aside className="lg:col-span-1 bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center">
  <img
    src={formData.profilePicture || "https://storage.googleapis.com/a1aa/image/28de9a53-dc8c-4ae3-b17a-5acd139beb18.jpg"}
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover mb-4 border border-gray-300"
  />
  <p className="text-lg font-semibold text-gray-900">
    {formData.firstName} {formData.lastName} <span>
    <a href="https://github.com/azzichaymae" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github text-gray-600 text-xl hover:text-gray-900"></i>
    </a>
  </span>
  </p>
  
  {formData.professionalTitle && (
    <p className="text-sm text-gray-500">{formData.professionalTitle}</p>
  )}
</aside>

      </div>
    </main>
  );
};

export default Profile;