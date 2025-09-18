import React, { useState } from 'react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const categories = [
    { id: 'all', name: 'All Media' },
    { id: 'gym', name: 'Gym Equipment' },
    { id: 'classes', name: 'Classes in Action' },
    { id: 'transformations', name: 'Transformations' },
    { id: 'events', name: 'Events' },
    { id: 'facilities', name: 'Facilities' }
  ];

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      category: 'gym',
      title: 'State-of-the-Art Weight Room',
      description: 'Our fully equipped weight room with the latest strength training equipment.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['weights', 'equipment', 'strength']
    },
    {
      id: 2,
      type: 'image',
      category: 'classes',
      title: 'Morning Yoga Session',
      description: 'Members enjoying our peaceful morning yoga class with natural lighting.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['yoga', 'wellness', 'group-class']
    },
    {
      id: 3,
      type: 'image',
      category: 'transformations',
      title: 'Sarah\'s 6-Month Transformation',
      description: 'Amazing results achieved through dedication and our personal training program.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['transformation', 'success', 'motivation']
    },
    {
      id: 4,
      type: 'video',
      category: 'classes',
      title: 'High-Energy Zumba Class',
      description: 'Experience the fun and energy of our popular Zumba classes.',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: 'https://example.com/zumba-video',
      tags: ['zumba', 'dance', 'cardio']
    },
    {
      id: 5,
      type: 'image',
      category: 'facilities',
      title: 'Modern Cardio Area',
      description: 'Spacious cardio section with treadmills, ellipticals, and stationary bikes.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['cardio', 'modern', 'spacious']
    },
    {
      id: 6,
      type: 'image',
      category: 'events',
      title: 'Summer Fitness Challenge',
      description: 'Members celebrating at our annual summer fitness challenge event.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['challenge', 'community', 'celebration']
    },
    {
      id: 7,
      type: 'video',
      category: 'transformations',
      title: 'Mike\'s Journey to Strength',
      description: 'Follow Mike\'s incredible journey from beginner to powerlifting champion.',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: 'https://example.com/mike-transformation',
      tags: ['transformation', 'strength', 'powerlifting']
    },
    {
      id: 8,
      type: 'image',
      category: 'gym',
      title: 'CrossFit Training Area',
      description: 'Dedicated CrossFit space with Olympic platforms and functional equipment.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['crossfit', 'functional', 'olympic']
    },
    {
      id: 9,
      type: 'image',
      category: 'classes',
      title: 'HIIT Training Session',
      description: 'Intense HIIT workout session pushing members to their limits.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['HIIT', 'intense', 'group-training']
    },
    {
      id: 10,
      type: 'image',
      category: 'facilities',
      title: 'Relaxation Lounge',
      description: 'Post-workout relaxation area with massage chairs and recovery tools.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['relaxation', 'recovery', 'comfort']
    },
    {
      id: 11,
      type: 'video',
      category: 'gym',
      title: 'Equipment Tour',
      description: 'Take a virtual tour of our premium gym equipment and facilities.',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: 'https://example.com/equipment-tour',
      tags: ['tour', 'equipment', 'facilities']
    },
    {
      id: 12,
      type: 'image',
      category: 'transformations',
      title: 'Lisa\'s Weight Loss Success',
      description: 'Lisa lost 50 pounds and gained confidence through our nutrition and fitness program.',
      thumbnail: '/api/placeholder/300/200',
      fullSize: '/api/placeholder/800/600',
      tags: ['weight-loss', 'nutrition', 'confidence']
    }
  ];

  const filteredMedia = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  const MediaModal = () => {
    if (!selectedMedia) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
            <button
              onClick={() => setSelectedMedia(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>
          
          <div className="p-4">
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.fullSize || selectedMedia.thumbnail}
                alt={selectedMedia.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">▶️</div>
                  <p className="text-gray-600">Video Player</p>
                  <p className="text-sm text-gray-500">Video would play here</p>
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <p className="text-gray-700 mb-3">{selectedMedia.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedMedia.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const transformationStories = mediaItems.filter(item => item.category === 'transformations');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our state-of-the-art facilities, see our classes in action, 
            and get inspired by amazing transformation stories from our members.
          </p>
        </div>

        {/* Transformation Stories Highlight */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformationStories.slice(0, 3).map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Transformation Photo</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Success Story
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{story.description}</p>
                  <button
                    onClick={() => setSelectedMedia(story)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    View Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div 
                className="relative h-48 bg-gray-200 flex items-center justify-center"
                onClick={() => setSelectedMedia(item)}
              >
                <span className="text-gray-500">Media Thumbnail</span>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-full p-3">
                      <span className="text-blue-600 text-2xl">▶️</span>
                    </div>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.type === 'video' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {item.type === 'video' ? 'VIDEO' : 'PHOTO'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-gray-500 text-xs">+{item.tags.length - 2}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Tour CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Take a Virtual Tour</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Can't visit us in person yet? Take our interactive virtual tour to explore 
            our facilities from the comfort of your home.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Virtual Tour
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Transformations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Classes Weekly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600">Expert Trainers</div>
            </div>
          </div>
        </div>

        {/* Social Media Integration */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Follow Us on Social Media</h2>
          <p className="text-gray-600 mb-6">Stay connected and see daily updates from our gym community!</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              📘 Facebook
            </button>
            <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
              📷 Instagram
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              🎥 YouTube
            </button>
          </div>
        </div>
      </div>
      
      <MediaModal />
    </div>
  );
};

export default GalleryPage;