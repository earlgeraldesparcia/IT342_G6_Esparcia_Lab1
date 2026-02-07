import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      setUserData(response.data);
    } catch (err) {
      setError('Failed to load user data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const displayUser = userData || authUser;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="profile-card">
        <h2>Profile Information</h2>
        <div className="profile-content">
          <div className="profile-item">
            <label>Username:</label>
            <span>{displayUser?.username}</span>
          </div>

          <div className="profile-item">
            <label>Email:</label>
            <span>{displayUser?.email}</span>
          </div>

          <div className="profile-item">
            <label>First Name:</label>
            <span>{displayUser?.firstName}</span>
          </div>

          <div className="profile-item">
            <label>Last Name:</label>
            <span>{displayUser?.lastName}</span>
          </div>

          {displayUser?.createdAt && (
            <div className="profile-item">
              <label>Member Since:</label>
              <span>{new Date(displayUser.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
