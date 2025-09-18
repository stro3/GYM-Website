import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: ['123 Fitness Street', 'New York, NY 10001', 'United States']
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568']
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['info@originFitness.com', 'support@originFitness.com']
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      details: ['Mon-Fri: 5:00 AM - 11:00 PM', 'Sat-Sun: 6:00 AM - 10:00 PM']
    }
  ];

  const departments = [
    {
      name: 'Membership Services',
      description: 'Questions about memberships, pricing, and account management',
      phone: '+1 (555) 123-4567',
      email: 'membership@originFitness.com'
    },
    {
      name: 'Personal Training',
      description: 'Book sessions, trainer inquiries, and fitness consultations',
      phone: '+1 (555) 123-4568',
      email: 'trainers@originFitness.com'
    },
    {
      name: 'Class Schedules',
      description: 'Group classes, bookings, and schedule information',
      phone: '+1 (555) 123-4569',
      email: 'classes@originFitness.com'
    },
    {
      name: 'Corporate Wellness',
      description: 'Business partnerships and corporate fitness programs',
      phone: '+1 (555) 123-4570',
      email: 'corporate@originFitness.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your fitness journey? Have questions about our services? 
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="membership">Membership</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="classes">Group Classes</option>
                    <option value="corporate">Corporate Wellness</option>
                    <option value="complaint">Complaint/Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Find Us</h3>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>Interactive Google Maps</p>
                  <p className="text-sm">123 Fitness Street, New York, NY 10001</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="https://maps.google.com/?q=123+Fitness+Street+New+York+NY+10001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Contact by Department</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{dept.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                <div className="space-y-2">
                  <p className="text-blue-600 font-medium">{dept.phone}</p>
                  <p className="text-blue-600 text-sm">{dept.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What are your operating hours?</h3>
              <p className="text-gray-600 mb-4">We're open Monday-Friday 5:00 AM - 11:00 PM, and weekends 6:00 AM - 10:00 PM.</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer free trials?</h3>
              <p className="text-gray-600 mb-4">Yes! We offer a complimentary 3-day trial pass for first-time visitors.</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is parking available?</h3>
              <p className="text-gray-600">Yes, we provide free parking for all members and visitors.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I freeze my membership?</h3>
              <p className="text-gray-600 mb-4">Yes, memberships can be frozen for up to 3 months per year for medical or travel reasons.</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you have personal trainers?</h3>
              <p className="text-gray-600 mb-4">Absolutely! We have certified personal trainers available for one-on-one sessions.</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What should I bring for my first visit?</h3>
              <p className="text-gray-600">Just bring workout clothes, a water bottle, and a valid ID. We'll provide a tour and answer all your questions!</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Contact</h3>
          <p className="text-red-700 mb-2">For urgent matters during operating hours:</p>
          <p className="text-red-800 font-semibold text-lg">+1 (555) 911-HELP</p>
          <p className="text-red-600 text-sm mt-2">For life-threatening emergencies, always call 911 first</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;