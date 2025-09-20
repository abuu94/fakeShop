// src/pages/ProfilePage.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useUpdateUser } from "../hooks/useUserHook";

const ProfilePage = () => {
  const { user } = useAuth(); // ✅ Use correct context
  const [formData, setFormData] = useState({ username: "", email: "", phone: "" });

  // const updateUserMutation = useUpdateUser();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  console.log("Current user data:", user);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user?.id) {
      console.log("Saving user data:", formData);
      
      // updateUserMutation.mutate({ id: user.id, user: formData });
    }
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>

    
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
      <div className="space-y-4">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Username"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Email"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Phone"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
