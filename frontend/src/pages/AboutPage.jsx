import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About GymFit Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to GymFit Pro - your premier destination for fitness and wellness. 
            We are committed to helping you achieve your health goals in a supportive, 
            state-of-the-art environment.
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To empower individuals to transform their lives through fitness, providing 
              world-class facilities, expert guidance, and a supportive community that 
              inspires lasting lifestyle changes.
            </p>
            <p className="text-gray-600">
              We believe that fitness is not just about physical transformation, but about 
              building confidence, strength, and a healthier relationship with your body.
            </p>
          </div>
          
          <div className="bg-blue-600 p-8 rounded-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="mb-4">
              To be the leading fitness destination that transforms communities through 
              innovative programs, cutting-edge technology, and personalized wellness solutions.
            </p>
            <ul className="space-y-2">
              <li>✓ Excellence in everything we do</li>
              <li>✓ Inclusive and welcoming environment</li>
              <li>✓ Continuous innovation and improvement</li>
              <li>✓ Personalized attention for every member</li>
            </ul>
          </div>
        </div>
        
        {/* Facilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏋️</div>
              <h3 className="text-xl font-semibold mb-2">Weight Training Area</h3>
              <p className="text-gray-600">State-of-the-art equipment for strength training and muscle building.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-xl font-semibold mb-2">Cardio Zone</h3>
              <p className="text-gray-600">Modern cardio equipment with entertainment systems and heart rate monitoring.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-semibold mb-2">Group Class Studios</h3>
              <p className="text-gray-600">Spacious studios for yoga, pilates, dance, and group fitness classes.</p>
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Certifications & Awards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm font-semibold">Best Gym 2024</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-sm font-semibold">5-Star Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm font-semibold">Certified Trainers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-sm font-semibold">Safety Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;