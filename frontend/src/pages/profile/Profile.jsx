import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  return (
    <div>
      <h1>Profile page</h1>
      <p>
        <strong>User ID:</strong> {user._id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <Link to="/" className="btn btn-primary">
        Go back to home
      </Link>
    </div>
  );
};

export default Profile;
