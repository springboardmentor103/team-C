import React, { useState } from 'react';
import './Settings.css';
import { User, Mail, Phone, Camera, Lock, Bell, Shield, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'I love helping others with various tasks around the house and community.'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskRequests: true,
    taskUpdates: true,
    messages: true,
    promotions: false
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://via.placeholder.com/150');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (PNG, JPG)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySave = async (e) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (securityData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.loading('Deleting account...');
      // Add account deletion logic here
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Add logout logic here
      toast.success('Logged out successfully!');
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <button 
            className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18} />
            <span>Security</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Shield size={18} />
            <span>Privacy</span>
          </button>
          <div className="sidebar-spacer"></div>
          <button 
            className="sidebar-tab logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="settings-form">
              <div className="profile-image-section">
                <div className="image-container">
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="profile-image"
                  />
                  <label htmlFor="profileImage" className="image-upload-btn">
                    <Camera size={20} />
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input"
                    />
                  </label>
                </div>
                <p className="image-help-text">
                  Click the camera icon to upload a new profile picture
                </p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="form-input"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySave} className="settings-form">
              <h3 className="section-title">Change Password</h3>
              
              <div className="form-group">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={securityData.currentPassword}
                  onChange={handleSecurityChange}
                  className="form-input"
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={securityData.newPassword}
                  onChange={handleSecurityChange}
                  className="form-input"
                  placeholder="Enter new password"
                />
                <p className="help-text">
                  Must be at least 6 characters long
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={handleSecurityChange}
                  className="form-input"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>

              <div className="danger-zone">
                <h3 className="danger-title">Delete Account</h3>
                <p className="danger-description">
                  Once you delete your account, there is no going back. 
                  Please be certain.
                </p>
                <button 
                  type="button"
                  className="delete-account-btn"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-form">
              <h3 className="section-title">Notification Preferences</h3>
              
              <div className="notification-settings">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4 className="notification-title">Email Notifications</h4>
                    <p className="notification-description">
                      Receive notifications via email
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4 className="notification-title">Push Notifications</h4>
                    <p className="notification-description">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4 className="notification-title">Task Requests</h4>
                    <p className="notification-description">
                      Get notified when someone requests your tasks
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="taskRequests"
                      checked={notificationSettings.taskRequests}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4 className="notification-title">Task Updates</h4>
                    <p className="notification-description">
                      Notifications about task status changes
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="taskUpdates"
                      checked={notificationSettings.taskUpdates}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4 className="notification-title">Messages</h4>
                    <p className="notification-description">
                      Notifications about new messages
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="messages"
                      checked={notificationSettings.messages}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4 className="notification-title">Promotions & Updates</h4>
                    <p className="notification-description">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="promotions"
                      checked={notificationSettings.promotions}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="save-btn"
                  onClick={() => toast.success('Notification settings saved!')}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="settings-form">
              <h3 className="section-title">Privacy Settings</h3>
              
              <div className="privacy-settings">
                <div className="privacy-item">
                  <div className="privacy-info">
                    <h4 className="privacy-title">Profile Visibility</h4>
                    <p className="privacy-description">
                      Control who can see your profile information
                    </p>
                  </div>
                  <select className="privacy-select">
                    <option value="public">Everyone</option>
                    <option value="helpers">Only Helpers</option>
                    <option value="private">Only Me</option>
                  </select>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h4 className="privacy-title">Activity Status</h4>
                    <p className="privacy-description">
                      Show when you're active on the platform
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h4 className="privacy-title">Location Sharing</h4>
                    <p className="privacy-description">
                      Share your approximate location for better task matching
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h4 className="privacy-title">Task History</h4>
                    <p className="privacy-description">
                      Allow others to see your completed tasks
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h4 className="privacy-title">Contact Information</h4>
                    <p className="privacy-description">
                      Show contact information on your profile
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="privacy-note">
                <h4 className="privacy-note-title">Data Privacy</h4>
                <p className="privacy-note-text">
                  We respect your privacy. Your data is encrypted and stored securely.
                  You can request to download or delete your data at any time.
                </p>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="save-btn"
                  onClick={() => toast.success('Privacy settings saved!')}
                >
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;