import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Email notification service
const sendWelcomeEmail = async (email, name) => {
  try {
    // This would integrate with your backend email service
    console.log(`Sending welcome email to ${email} for ${name}`);
    // await axios.post('/api/email/welcome', { email, name });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
};

const subscribeToNewsletter = async (email) => {
  try {
    // This would integrate with your backend newsletter service
    console.log(`Subscribing ${email} to newsletter`);
    // await axios.post('/api/newsletter/subscribe', { email });
    return { success: true, message: 'Successfully subscribed to newsletter!' };
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    return { success: false, message: 'Subscription failed. Please try again.' };
  }
};

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    members: 500,
    trainers: 50,
    classes: 100,
    isLoading: true
  });
  const [notification, setNotification] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [socialStats, setSocialStats] = useState({
    instagram: 12500,
    facebook: 8900,
    youtube: 3400,
    loading: true
  });

  // Social media sharing function
  const shareOnSocialMedia = (platform, content) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(window.location.href)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      instagram: `https://www.instagram.com/gymfitpro_official` // Direct to Instagram profile
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    const result = await subscribeToNewsletter(newsletterEmail);
    setNewsletterStatus(result);
    if (result.success) {
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(null), 5000);
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate loading stats from API
  useEffect(() => {
    const loadStats = async () => {
      // Simulate API call
      setTimeout(() => {
        setStats({
          members: 524,
          trainers: 52,
          classes: 108,
          isLoading: false
        });
      }, 2000);
    };
    loadStats();
  }, []);

  // Load social media stats
  useEffect(() => {
    const loadSocialStats = async () => {
      // Simulate API call to get social media follower counts
      setTimeout(() => {
        setSocialStats({
          instagram: 12847,
          facebook: 9123,
          youtube: 3567,
          loading: false
        });
      }, 1500);
    };
    loadSocialStats();
  }, []);

  // Push notification setup
  useEffect(() => {
    if (isAuthenticated && 'Notification' in window && 'serviceWorker' in navigator) {
      // Request notification permission
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Schedule welcome notification for new users
          setTimeout(() => {
            new Notification('GymFit Pro', {
              body: `Welcome ${user?.firstName || 'Member'}! Don't forget to book your workout today.`,
              icon: '/favicon.ico',
              badge: '/favicon.ico'
            });
          }, 10000); // Show after 10 seconds
        }
      });
    }
  }, [isAuthenticated, user]);

  const features = [
    {
      icon: '🏋️‍♂️',
      title: 'Professional Equipment',
      description: 'State-of-the-art fitness equipment from leading brands for optimal workout experience.'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Trainers',
      description: 'Certified personal trainers with years of experience to guide your fitness journey.'
    },
    {
      icon: '📅',
      title: 'Flexible Classes',
      description: 'Wide variety of group classes including Yoga, Zumba, CrossFit, and more.'
    },
    {
      icon: '📱',
      title: 'Modern Technology',
      description: 'Easy online booking, progress tracking, and member portal for seamless experience.'
    },
    {
      icon: '🍎',
      title: 'Nutrition Guidance',
      description: 'Personalized diet plans and nutrition counseling to complement your workouts.'
    },
    {
      icon: '🏆',
      title: 'Achievement Tracking',
      description: 'Track your progress, set goals, and celebrate your fitness milestones.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Member since 2022',
      content: 'GymFit Pro transformed my life! The trainers are amazing and the facilities are top-notch.',
      image: '👩‍🦰'
    },
    {
      name: 'Mike Chen',
      role: 'Member since 2021',
      content: 'Best gym in the city! Great classes, friendly staff, and excellent equipment.',
      image: '👨‍🦱'
    },
    {
      name: 'Emily Davis',
      role: 'Member since 2023',
      content: 'The nutrition guidance and personal training helped me achieve my fitness goals faster than I imagined.',
      image: '👩‍🦳'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Welcome Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300">
          <div className="flex items-center">
            <span className="mr-2">🎉</span>
            {notification}
            <button 
              onClick={() => setNotification(null)}
              className="ml-3 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions for Authenticated Users */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <h4 className="font-semibold text-gray-800 mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <Link 
                to="/classes" 
                className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded transition-colors"
              >
                📅 Book a Class
              </Link>
              <Link 
                to="/trainers" 
                className="block w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 rounded transition-colors"
              >
                👨‍🏫 Find a Trainer
              </Link>
              <Link 
                to="/progress" 
                className="block w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded transition-colors"
              >
                📊 View Progress
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Body,
            <br />
            <span className="text-yellow-400">Transform Your Life</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join GymFit Pro and embark on a journey to your best self with our world-class facilities, 
            expert trainers, and comprehensive fitness programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Start Your Journey
                </Link>
                <Link
                  to="/memberships"
                  className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  View Memberships
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/classes"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Book a Class
                </Link>
                <Link
                  to="/member-portal"
                  className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Member Portal
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GymFit Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to achieve your fitness goals in a supportive, 
              modern environment designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {stats.isLoading ? (
                  <div className="animate-pulse bg-yellow-400 bg-opacity-30 rounded h-12 w-20 mx-auto"></div>
                ) : (
                  `${stats.members}+`
                )}
              </div>
              <div className="text-gray-300">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {stats.isLoading ? (
                  <div className="animate-pulse bg-yellow-400 bg-opacity-30 rounded h-12 w-16 mx-auto"></div>
                ) : (
                  `${stats.trainers}+`
                )}
              </div>
              <div className="text-gray-300">Expert Trainers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {stats.isLoading ? (
                  <div className="animate-pulse bg-yellow-400 bg-opacity-30 rounded h-12 w-20 mx-auto"></div>
                ) : (
                  `${stats.classes}+`
                )}
              </div>
              <div className="text-gray-300">Group Classes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-300">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people who transformed their lives with us.
            </p>
          </div>

          {/* Interactive Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white p-8 rounded-lg shadow-md mx-2">
                      <div className="flex items-center mb-6">
                        <div className="text-4xl mr-4">{testimonial.image}</div>
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                      
                      {/* Star Rating */}
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Today's Featured Classes
            </h2>
            <p className="text-xl text-gray-600">
              Join these popular classes happening today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Morning Yoga Flow', time: '7:00 AM', instructor: 'Sarah', spots: '5 spots left', difficulty: 'Beginner', icon: '🧘' },
              { name: 'HIIT Training', time: '12:00 PM', instructor: 'Mike', spots: '3 spots left', difficulty: 'Advanced', icon: '💪' },
              { name: 'Zumba Dance', time: '6:00 PM', instructor: 'Emily', spots: '8 spots left', difficulty: 'All Levels', icon: '💃' }
            ].map((classItem, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{classItem.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">{classItem.time} • {classItem.instructor}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{classItem.spots}</span>
                  <span className="text-sm text-gray-500">{classItem.difficulty}</span>
                </div>
                {isAuthenticated ? (
                  <Link 
                    to="/classes" 
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Book Now
                  </Link>
                ) : (
                  <Link 
                    to="/signup" 
                    className="block w-full text-center bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Sign Up to Book
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Fitness Tips & News
          </h2>
          <p className="text-xl mb-8">
            Get exclusive workout tips, nutrition advice, and class updates delivered to your inbox.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button 
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                disabled={!newsletterEmail}
              >
                Subscribe
              </button>
            </div>
            
            {newsletterStatus && (
              <div className={`mt-4 p-3 rounded ${newsletterStatus.success ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                {newsletterStatus.message}
              </div>
            )}
            
            <p className="text-sm text-purple-200 mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </form>
          
          {/* Social Media Integration */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Follow Us on Social Media</h3>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => shareOnSocialMedia('instagram', 'Check out GymFit Pro - Transform Your Life!')}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <span>📸</span>
                <span className="text-sm">
                  {socialStats.loading ? '...' : `${socialStats.instagram.toLocaleString()}`}
                </span>
              </button>
              
              <button
                onClick={() => shareOnSocialMedia('facebook', 'Join GymFit Pro and transform your fitness journey!')}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <span>📘</span>
                <span className="text-sm">
                  {socialStats.loading ? '...' : `${socialStats.facebook.toLocaleString()}`}
                </span>
              </button>
              
              <button
                onClick={() => shareOnSocialMedia('twitter', 'Transform your body, transform your life at GymFit Pro!')}
                className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <span>🐦</span>
                <span className="text-sm">Share</span>
              </button>
              
              <button
                onClick={() => shareOnSocialMedia('instagram', 'Watch our workout videos!')}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <span>📺</span>
                <span className="text-sm">
                  {socialStats.loading ? '...' : `${socialStats.youtube.toLocaleString()}`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Progress Tracking Preview & Gallery Integration */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Progress Tracking Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  📊 Track Your Progress
                </h3>
                <p className="text-gray-600">
                  Advanced analytics to monitor your fitness journey
                </p>
              </div>
              
              {/* Mini Progress Dashboard */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm font-medium">Weekly Workouts</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-blue-200 rounded-full h-2 mr-2">
                      <div className="w-12 bg-blue-600 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm">4/5</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm font-medium">BMI Goal</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-green-200 rounded-full h-2 mr-2">
                      <div className="w-10 bg-green-600 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm">22.5</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm font-medium">Calories Burned</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-purple-200 rounded-full h-2 mr-2">
                      <div className="w-14 bg-purple-600 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm">2,450</span>
                  </div>
                </div>
              </div>
              
              {isAuthenticated ? (
                <Link 
                  to="/progress" 
                  className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors"
                >
                  View Full Analytics
                </Link>
              ) : (
                <Link 
                  to="/signup" 
                  className="block w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white text-center py-3 rounded-lg transition-colors"
                >
                  Sign Up to Track Progress
                </Link>
              )}
            </div>
            
            {/* Gallery Integration Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎥 Gym Gallery
                </h3>
                <p className="text-gray-600">
                  See our state-of-the-art facilities and community
                </p>
              </div>
              
              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { title: 'Modern Equipment', emoji: '🏋️‍♂️' },
                  { title: 'Group Classes', emoji: '🧘‍♀️' },
                  { title: 'Personal Training', emoji: '👨‍🏫' },
                  { title: 'Wellness Area', emoji: '🌿' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-sm font-medium text-gray-700">{item.title}</div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/gallery" 
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg transition-colors"
              >
                Explore Full Gallery
              </Link>
            </div>
            
          </div>
        </div>
      </section>
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied members who have achieved their fitness goals with us. 
            Your transformation starts today!
          </p>
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                onClick={() => {
                  // Send welcome email after successful signup (would be integrated with actual signup process)
                  sendWelcomeEmail('newuser@example.com', 'New Member');
                }}
              >
                Join Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/classes"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Book Your First Class
              </Link>
              <Link
                to="/member-portal"
                className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Your Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;