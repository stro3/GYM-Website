import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrainersPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    serviceType: 'personal-training',
    preferredDate: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch trainers from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/trainers`, {
          params: { specialty: selectedSpecialty }
        });
        
        if (response.data.success) {
          setTrainers(response.data.data);
        } else {
          setError('Failed to load trainers');
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError('Failed to load trainers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [selectedSpecialty, API_URL]);

  const specialties = [
    { id: 'all', name: 'All Trainers' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio & Fitness' },
    { id: 'yoga', name: 'Yoga & Flexibility' },
    { id: 'crossfit', name: 'CrossFit' },
    { id: 'nutrition', name: 'Nutrition' }
  ];

  const handleContactTrainer = async (trainer) => {
    if (!isAuthenticated) {
      alert('Please login to contact trainers');
      return;
    }
    setSelectedTrainer(trainer);
    setShowContactModal(true);
  };

  const ContactModal = () => {
    if (!showContactModal || !selectedTrainer) return null;

    const handleSubmit = async () => {
      if (!formData.message.trim()) {
        alert('Please enter a message');
        return;
      }

      try {
        setSending(true);
        const response = await axios.post(`${API_URL}/trainers/${selectedTrainer.id}/contact`, formData);
        if (response.data.success) {
          alert('Message sent! The trainer will contact you soon.');
          setShowContactModal(false);
          setFormData({ serviceType: 'personal-training', preferredDate: '', message: '' });
        } else {
          alert(response.data.message || 'Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert(error.response?.data?.message || 'Failed to send message. Please try again.');
      } finally {
        setSending(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Contact {selectedTrainer.name}</h3>
            <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.serviceType}
              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            >
              <option value="personal-training">Personal Training Session</option>
              <option value="consultation">Fitness Consultation</option>
              <option value="nutrition">Nutrition Guidance</option>
              <option value="program-design">Custom Program Design</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.preferredDate}
              onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded-md h-24"
              placeholder="Tell us about your fitness goals..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Session Rate: {selectedTrainer.sessionPrice} | Availability: {selectedTrainer.availability}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowContactModal(false)}
              disabled={sending}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={sending}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Message'}
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
            Meet Our Expert Trainers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified fitness professionals are here to guide you on your fitness journey. 
            Each trainer brings unique expertise and passion to help you achieve your goals.
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

        {/* Specialty Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => setSelectedSpecialty(specialty.id)}
              disabled={loading}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedSpecialty === specialty.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {specialty.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading trainers...</span>
          </div>
        )}

        {/* No Trainers State */}
        {!loading && !error && trainers.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trainers found</h3>
            <p className="text-gray-600">Try selecting a different specialty or check back later.</p>
          </div>
        )}

        {/* Trainers Grid */}
        {!loading && !error && trainers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Trainer Photo</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
                    <p className="text-blue-600 font-medium">{trainer.title}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1 text-sm text-gray-600">{trainer.rating} ({trainer.reviews})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{trainer.bio}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700">Experience:</span>
                    <span className="ml-2 text-gray-600">{trainer.experience}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700">Rate:</span>
                    <span className="ml-2 text-gray-600">{trainer.sessionPrice}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700">Languages:</span>
                    <span className="ml-2 text-gray-600">{trainer.languages.join(', ')}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Certifications:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {trainer.certifications.slice(0, 2).map((cert, index) => (
                      <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                    {trainer.certifications.length > 2 && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        +{trainer.certifications.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Achievements:</span>
                  <ul className="mt-1 text-xs text-gray-600">
                    {trainer.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-blue-500 mr-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Availability:</span>
                  <p className="text-xs text-gray-600 mt-1">{trainer.availability}</p>
                </div>
                
                <button
                  onClick={() => handleContactTrainer(trainer)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Contact Trainer
                </button>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Work with Our Trainers?</h2>
            <p className="text-gray-600 mb-6">Join our gym to book personal training sessions and reach your fitness goals faster!</p>
            <Link to="/signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Join Now
            </Link>
          </div>
        )}

        {/* Why Choose Our Trainers */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose Our Trainers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Professionals</h3>
              <p className="text-gray-600">All our trainers hold recognized certifications and continue their education regularly.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">Our trainers have helped hundreds of clients achieve their fitness goals safely and effectively.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
              <p className="text-gray-600">Each trainer creates customized programs tailored to your specific needs and goals.</p>
            </div>
          </div>
        </div>
      </div>
      
      <ContactModal />
    </div>
  );
};

export default TrainersPage;