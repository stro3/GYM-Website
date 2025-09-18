import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'fitness', name: 'Fitness Tips' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'workouts', name: 'Workouts' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'success', name: 'Success Stories' }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Essential Tips for Beginner Gym-Goers',
      excerpt: 'Starting your fitness journey can be overwhelming. Here are the fundamental tips every beginner should know before stepping into the gym.',
      category: 'fitness',
      author: 'Sarah Johnson',
      authorRole: 'Certified Personal Trainer',
      publishDate: '2023-12-10',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['beginner', 'gym', 'tips'],
      featured: true
    },
    {
      id: 2,
      title: 'The Science Behind HIIT: Why It Works',
      excerpt: 'High-Intensity Interval Training has taken the fitness world by storm. Discover the scientific principles that make HIIT so effective.',
      category: 'workouts',
      author: 'Dr. Mike Chen',
      authorRole: 'Exercise Physiologist',
      publishDate: '2023-12-08',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      tags: ['HIIT', 'science', 'cardio'],
      featured: false
    },
    {
      id: 3,
      title: 'Meal Prep Made Simple: A Week of Healthy Eating',
      excerpt: 'Transform your nutrition with easy meal prep strategies. Learn how to prepare a week of balanced, delicious meals in just a few hours.',
      category: 'nutrition',
      author: 'Maria Garcia',
      authorRole: 'Registered Dietitian',
      publishDate: '2023-12-05',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['meal-prep', 'nutrition', 'healthy-eating'],
      featured: true
    },
    {
      id: 4,
      title: 'From Couch to 5K: John\'s Incredible Transformation',
      excerpt: 'Meet John, who went from a sedentary lifestyle to running his first 5K in just 12 weeks. His story will inspire you to take that first step.',
      category: 'success',
      author: 'Emma Wilson',
      authorRole: 'Fitness Coach',
      publishDate: '2023-12-03',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      tags: ['transformation', 'running', 'motivation'],
      featured: false
    },
    {
      id: 5,
      title: 'Building Mental Resilience Through Exercise',
      excerpt: 'Exercise isn\'t just about physical health. Discover how regular workouts can strengthen your mental resilience and improve overall well-being.',
      category: 'lifestyle',
      author: 'Dr. Lisa Anderson',
      authorRole: 'Sports Psychologist',
      publishDate: '2023-12-01',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      tags: ['mental-health', 'psychology', 'wellness'],
      featured: false
    },
    {
      id: 6,
      title: 'The Perfect Pre and Post-Workout Nutrition',
      excerpt: 'Maximize your workout results with proper nutrition timing. Learn what to eat before and after exercise for optimal performance and recovery.',
      category: 'nutrition',
      author: 'David Brown',
      authorRole: 'Sports Nutritionist',
      publishDate: '2023-11-28',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['nutrition', 'performance', 'recovery'],
      featured: true
    },
    {
      id: 7,
      title: 'Strength Training for Women: Debunking Common Myths',
      excerpt: 'Break through the misconceptions about women and weightlifting. Learn why strength training is essential for women of all ages.',
      category: 'fitness',
      author: 'Sarah Johnson',
      authorRole: 'Certified Personal Trainer',
      publishDate: '2023-11-25',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['women', 'strength-training', 'myths'],
      featured: false
    },
    {
      id: 8,
      title: 'Creating a Sustainable Workout Routine',
      excerpt: 'The key to long-term fitness success is sustainability. Learn how to create a workout routine that fits your lifestyle and keeps you motivated.',
      category: 'lifestyle',
      author: 'Mike Chen',
      authorRole: 'Fitness Coach',
      publishDate: '2023-11-22',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      tags: ['routine', 'sustainability', 'motivation'],
      featured: false
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fitness Blog & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, workout tips, nutrition guidance, and inspiring success stories 
            to help you on your fitness journey.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Featured Article Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-yellow-400 ml-2">⭐</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div>
                      <p className="font-medium">{article.author}</p>
                      <p>{article.authorRole}</p>
                    </div>
                    <div className="text-right">
                      <p>{new Date(article.publishDate).toLocaleDateString()}</p>
                      <p>{article.readTime}</p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Read More
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

        {/* All Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div>
                    <p className="font-medium">{article.author}</p>
                    <p className="text-xs">{article.authorRole}</p>
                  </div>
                  <p>{new Date(article.publishDate).toLocaleDateString()}</p>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Read Article
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Our Latest Articles</h2>
          <p className="text-blue-100 mb-6">Get weekly fitness tips, nutrition advice, and workout routines delivered to your inbox.</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl mb-2">🏋️‍♀️</div>
              <h3 className="font-semibold">Strength Training</h3>
              <p className="text-sm text-gray-600">Build muscle and strength</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl mb-2">🥗</div>
              <h3 className="font-semibold">Nutrition</h3>
              <p className="text-sm text-gray-600">Healthy eating tips</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl mb-2">🏃‍♂️</div>
              <h3 className="font-semibold">Cardio Workouts</h3>
              <p className="text-sm text-gray-600">Heart-pumping exercises</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-3xl mb-2">🧘‍♀️</div>
              <h3 className="font-semibold">Mind & Body</h3>
              <p className="text-sm text-gray-600">Mental wellness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;