import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';
import { Upload, X, Calendar, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const AddTask = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    picture: null,
    picturePreview: null
  });

  const categories = [
    'Moving',
    'Gardening',
    'Painting',
    'Cleaning',
    'Assembly',
    'Tech Help',
    'Car Care',
    'Delivery',
    'Pet Care',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) { // 15MB limit
        toast.error('File size must be less than 15MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (PNG, JPG, GIF)');
        return;
      }

      setFormData(prev => ({
        ...prev,
        picture: file,
        picturePreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      picture: null,
      picturePreview: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.location || 
        !formData.startDate || !formData.startTime || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating task...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Task created successfully!', { id: loadingToast });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        picture: null,
        picturePreview: null
      });
      
      // Navigate to feed
      navigate('/dashboard/feed');
    } catch (error) {
      toast.error('Failed to create task. Please try again.', { id: loadingToast });
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/dashboard/feed');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-header">
        <h1 className="add-task-title">Add New Task</h1>
        <p className="add-task-subtitle">
          Create a task and find someone to help you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="title" className="form-label required">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Help moving furniture"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label required">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label required">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Describe what help you need, any requirements, and what you'll provide."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label required">
              Location
            </label>
            <div className="input-with-icon">
              <MapPin size={18} className="input-icon" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Downtown Seattle, WA or specific address"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Schedule</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label required">
                Start Date
              </label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="startTime" className="form-label required">
                Start Time
              </label>
              <div className="input-with-icon">
                <Clock size={18} className="input-icon" />
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">
                End Date (Optional)
              </label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-input"
                  min={formData.startDate}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="endTime" className="form-label">
                End Time (Optional)
              </label>
              <div className="input-with-icon">
                <Clock size={18} className="input-icon" />
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="form-input"
                  disabled={!formData.endDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Task Image (Optional)</h3>
          <p className="section-subtitle">PNG, JPG, GIF up to 15MB</p>
          
          {formData.picturePreview ? (
            <div className="image-preview">
              <img 
                src={formData.picturePreview} 
                alt="Task preview" 
                className="preview-image"
              />
              <button 
                type="button"
                className="remove-image-btn"
                onClick={removeImage}
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div 
              className="file-upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload size={48} className="upload-icon" />
              <p className="upload-text">
                <span className="upload-link">Click to upload</span> or drag and drop
              </p>
              <p className="upload-subtext">
                PNG, JPG, GIF up to 15MB
              </p>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
          >
            Post Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;