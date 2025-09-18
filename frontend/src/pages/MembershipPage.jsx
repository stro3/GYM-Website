import React from 'react';
import { Link } from 'react-router-dom';

const MembershipPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'Perfect for beginners starting their fitness journey',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment',
        'Group fitness classes',
        'Mobile app access',
        'Free Wi-Fi'
      ],
      popular: false,
      color: 'gray'
    },
    {
      name: 'Premium',
      price: '$59',
      period: '/month',
      description: 'Most popular choice for serious fitness enthusiasts',
      features: [
        'Everything in Basic',
        'Personal training sessions (2/month)',
        'Nutrition consultation',
        'Advanced fitness assessment',
        'Priority class booking',
        'Guest passes (2/month)',
        'Towel service'
      ],
      popular: true,
      color: 'blue'
    },
    {
      name: 'VIP',
      price: '$99',
      period: '/month',
      description: 'Ultimate fitness experience with premium amenities',
      features: [
        'Everything in Premium',
        'Unlimited personal training',
        'Custom meal planning',
        'Body composition analysis',
        'Unlimited guest passes',
        'Exclusive VIP area access',
        '24/7 gym access',
        'Massage therapy (1/month)'
      ],
      popular: false,
      color: 'purple'
    }
  ];

  const additionalPlans = [
    {
      name: 'Student',
      price: '$19',
      period: '/month',
      description: 'Special discount for students',
      note: 'Valid student ID required'
    },
    {
      name: 'Corporate',
      price: 'Custom',
      period: 'pricing',
      description: 'Group plans for businesses',
      note: 'Minimum 10 employees'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Membership Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select the perfect membership plan that fits your fitness goals and lifestyle. 
            All plans include access to our state-of-the-art facilities.
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-green-800 font-semibold">🎉 7-Day Free Trial for All Plans!</p>
          </div>
        </div>
        
        {/* Main Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg p-8 transform transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-500">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/signup"
                className={`w-full block text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Start {plan.name} Plan
              </Link>
            </div>
          ))}
        </div>
        
        {/* Additional Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Special Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalPlans.map((plan, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {plan.price} <span className="text-lg text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.note}</p>
                <Link
                  to="/contact"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your membership at any time with 30 days notice.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there any hidden fees?</h3>
              <p className="text-gray-600">No hidden fees! What you see is what you pay. One-time enrollment fee may apply.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I freeze my membership?</h3>
              <p className="text-gray-600">Yes, you can freeze your membership for up to 3 months per year for medical reasons.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer family plans?</h3>
              <p className="text-gray-600">Yes! Contact us for special family pricing and group discounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
