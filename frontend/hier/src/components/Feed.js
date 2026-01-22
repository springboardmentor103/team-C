import React from 'react';
import { MapPin, Calendar, Clock, User } from 'lucide-react';
import './Feed.css';

const Feed = () => {
  const tasks = [
    {
      id: 1,
      category: 'Moving',
      title: 'Help Moving Furniture',
      description: 'Need help moving furniture from my apartment to a new house. Heavy lifting required. Will provide snacks and drinks.',
      location: 'Downtown Seattle, WA',
      date: 'Jul 5, 2024',
      time: '2:00 PM - 6:00 PM',
      user: 'Sarah Johnson',
      status: 'requested'
    },
    {
      id: 2,
      category: 'Gardening',
      title: 'Garden Cleanup',
      description: 'Looking for someone to help clean up my backyard garden. Weeding, pruning, and general cleanup needed.',
      location: 'Bellevue, WA',
      date: 'Jul 6, 2024',
      time: '9:00 AM - 1:00 PM',
      user: 'Robert Wilson',
      status: 'requested'
    },
    {
      id: 3,
      category: 'Painting',
      title: 'Room Painting Project',
      description: 'Need help painting two bedrooms. Paint and supplies provided. Looking for someone with painting experience.',
      location: 'Redmond, WA',
      date: 'Jul 7, 2024',
      time: '8:00 AM - 5:00 PM',
      user: 'Emily Chen',
      status: 'requested'
    }
  ];

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1 className="feed-title">Feed</h1>
        <p className="feed-subtitle">Find tasks that need help</p>
      </div>

      <div className="feed-tasks">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            {/* Category and Title */}
            <div className="task-header">
              <div className="task-info">
                <span className="task-category">{task.category}</span>
                <h3 className="task-title">{task.title}</h3>
              </div>
              <div className="task-actions">
                <button
                  className={`request-btn ${task.status}`}
                >
                  {task.status === 'requested' ? 'Request Sent' : 'Request'}
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="task-description">{task.description}</p>

            {/* Details */}
            <div className="task-details">
              <div className="detail-item">
                <MapPin size={18} className="detail-icon" />
                <span>{task.location}</span>
              </div>
              <div className="detail-item">
                <Calendar size={18} className="detail-icon" />
                <span>{task.date}</span>
              </div>
              <div className="detail-item">
                <Clock size={18} className="detail-icon" />
                <span>{task.time}</span>
              </div>
            </div>

            {/* User */}
            <div className="task-footer">
              <div className="task-user">
                <div className="user-avatar">
                  {task.user.charAt(0)}
                </div>
                <span className="user-name">{task.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;