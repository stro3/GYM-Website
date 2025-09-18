import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClassesPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/classes`, {
          params: { category: selectedCategory }
        });
        
        if (response.data.success) {
          setClasses(response.data.data);
        } else {
          setError('Failed to load classes');
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
        setError('Failed to load classes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [selectedCategory, API_URL]);

  const categories = [
    { id: 'all', name: 'All Classes', icon: '🏃' },
    { id: 'yoga', name: 'Yoga', icon: '🧘' },
    { id: 'zumba', name: 'Zumba', icon: '💃' },
    { id: 'crossfit', name: 'CrossFit', icon: '🏋️' },
    { id: 'cardio', name: 'Cardio', icon: '❤️' },
    { id: 'strength', name: 'Strength', icon: '💪' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getAvailabilityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleBookClass = async (classItem) => {
    if (!isAuthenticated) {
      alert('Please login to book a class');
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/classes/${classItem.id}/book`);
      if (response.data.success) {
        alert(`Class booked successfully! ${response.data.data.availableSpots} spots remaining.`);
        // Refresh classes to show updated booking count
        const updatedResponse = await axios.get(`${API_URL}/classes`, {
          params: { category: selectedCategory }
        });
        if (updatedResponse.data.success) {
          setClasses(updatedResponse.data.data);
        }
      } else {
        alert(response.data.message || 'Failed to book class');
      }
    } catch (error) {
      console.error('Error booking class:', error);
      alert(error.response?.data?.message || 'Failed to book class. Please try again.');
    }
  };

  const BookingModal = () => {
    if (!showBooking || !selectedClass) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Book Class</h3>
            <button onClick={() => setShowBooking(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-lg">{selectedClass.name}</h4>
            <p className="text-gray-600">with {selectedClass.instructor}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              {selectedClass.schedule.map((slot, index) => (
                <option key={index} value={`${slot.day}-${slot.time}`}>
                  {slot.day} at {slot.time}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Available spots: {selectedClass.maxCapacity - selectedClass.currentBookings} / {selectedClass.maxCapacity}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowBooking(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Class booked successfully!');
                setShowBooking(false);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fitness Classes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our expert-led fitness classes designed to help you reach your goals. 
            From relaxing yoga to high-intensity training, we have something for everyone.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
                <div className="mt-2">
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading classes...</span>
          </div>
        )}

        {/* No Classes State */}
        {!loading && !error && classes.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}

        {/* Classes Grid */}
        {!loading && !error && classes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{classItem.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(classItem.difficulty)}`}>
                    {classItem.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{classItem.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Instructor:</span>
                    <span className="ml-1">{classItem.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-1">{classItem.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Price:</span>
                    <span className="ml-1">{classItem.price}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Availability</span>
                    <span className={`text-sm font-medium ${getAvailabilityColor(classItem.currentBookings, classItem.maxCapacity)}`}>
                      {classItem.maxCapacity - classItem.currentBookings} spots left
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(classItem.currentBookings / classItem.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Schedule:</span>
                  <div className="mt-1 space-y-1">
                    {classItem.schedule.map((slot, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {slot.day}s at {slot.time}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleBookClass(classItem)}
                  disabled={classItem.currentBookings >= classItem.maxCapacity}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    classItem.currentBookings >= classItem.maxCapacity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {classItem.currentBookings >= classItem.maxCapacity ? 'Class Full' : 'Book Class'}
                </button>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-gray-600 mb-6">Join our gym to access all classes and start booking today!</p>
            <Link to="/signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Sign Up Now
            </Link>
          </div>
        )}
      </div>
      
      <BookingModal />
    </div>
  );
};

export default ClassesPage;