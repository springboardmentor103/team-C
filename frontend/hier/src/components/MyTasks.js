import React, { useState } from 'react';
import './MyTasks.css';
import { Calendar, MapPin, Clock, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const MyTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Computer Setup Help',
      description: 'Need help setting up my new home office computer and network. Technical knowledge required.',
      category: 'tech',
      status: 'active',
      location: 'Downtown Seattle, WA',
      date: 'Jul 6, 2024',
      time: '3:00 PM - 6:00 PM',
      requests: 3,
      assignedTo: null
    },
    {
      id: 2,
      title: 'Car Wash & Detail',
      description: 'Looking for someone to wash and detail my car. All supplies will be provided.',
      category: 'car care',
      status: 'active',
      location: 'Your Location',
      date: 'Jul 9, 2024',
      time: '10:00 AM - 12:00 PM',
      requests: 5,
      assignedTo: null
    },
    {
      id: 3,
      title: 'Garden Maintenance',
      description: 'Weekly garden maintenance including weeding, watering, and trimming.',
      category: 'gardening',
      status: 'in progress',
      location: 'Bellevue, WA',
      date: 'Jul 7, 2024',
      time: '9:00 AM - 11:00 AM',
      requests: 2,
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 4,
      title: 'Furniture Assembly',
      description: 'Help assembling IKEA furniture including a bed frame and two bookcases.',
      category: 'assembly',
      status: 'completed',
      location: 'Redmond, WA',
      date: 'Jul 5, 2024',
      time: '1:00 PM - 4:00 PM',
      requests: 7,
      assignedTo: 'Michael Chen'
    }
  ]);

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'in progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div className="my-tasks-container">
      <div className="my-tasks-header">
        <h1 className="my-tasks-title">My Tasks</h1>
        <p className="my-tasks-subtitle">Manage your posted tasks</p>
      </div>

      <div className="tasks-filter">
        <button className="filter-btn active">All Tasks</button>
        <button className="filter-btn">Active</button>
        <button className="filter-btn">In Progress</button>
        <button className="filter-btn">Completed</button>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <div className="task-status-info">
                <span className={`task-status ${getStatusColor(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
                <span className="task-category">{task.category}</span>
              </div>
              <div className="task-actions">
                <button 
                  className="action-btn edit-btn"
                  title="Edit Task"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                  title="Delete Task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>

            <div className="task-details">
              <div className="detail-item">
                <MapPin size={16} className="detail-icon" />
                <span>{task.location}</span>
              </div>
              <div className="detail-item">
                <Calendar size={16} className="detail-icon" />
                <span>{task.date}</span>
              </div>
              <div className="detail-item">
                <Clock size={16} className="detail-icon" />
                <span>{task.time}</span>
              </div>
            </div>

            <div className="task-footer">
              <div className="task-stats">
                <span className="requests-count">
                  {task.requests} request{task.requests !== 1 ? 's' : ''}
                </span>
                {task.assignedTo && (
                  <span className="assigned-to">
                    Assigned to: <strong>{task.assignedTo}</strong>
                  </span>
                )}
              </div>

              <div className="status-actions">
                {task.status !== 'completed' && (
                  <>
                    <button 
                      className="status-action-btn complete-btn"
                      onClick={() => handleStatusChange(task.id, 'completed')}
                    >
                      <CheckCircle size={16} />
                      Mark Complete
                    </button>
                    {task.status === 'active' && (
                      <button 
                        className="status-action-btn progress-btn"
                        onClick={() => handleStatusChange(task.id, 'in progress')}
                      >
                        Start Progress
                      </button>
                    )}
                  </>
                )}
                {task.status === 'completed' && (
                  <button 
                    className="status-action-btn reopen-btn"
                    onClick={() => handleStatusChange(task.id, 'active')}
                  >
                    <XCircle size={16} />
                    Reopen Task
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">No Tasks Yet</h3>
          <p className="empty-state-description">
            You haven't posted any tasks yet. Create your first task to get help!
          </p>
          <button className="empty-state-btn">
            Create Your First Task
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTasks;