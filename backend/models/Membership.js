const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    name: {
      type: String,
      required: true,
      enum: ['basic', 'premium', 'vip', 'student', 'corporate']
    },
    duration: {
      type: Number, // in months
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    features: [{
      type: String
    }]
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'suspended', 'cancelled'],
    default: 'active'
  },
  paymentHistory: [{
    amount: Number,
    paymentDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash', 'upi', 'bank_transfer']
    },
    transactionId: String,
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed'],
      default: 'completed'
    }
  }],
  renewalReminder: {
    type: Boolean,
    default: true
  },
  autoRenewal: {
    type: Boolean,
    default: false
  },
  freezeHistory: [{
    startDate: Date,
    endDate: Date,
    reason: String,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  notes: String
}, {
  timestamps: true
});

// Calculate days remaining
membershipSchema.virtual('daysRemaining').get(function() {
  const now = new Date();
  const diff = this.endDate - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Check if membership is expiring soon (within 7 days)
membershipSchema.virtual('isExpiringSoon').get(function() {
  return this.daysRemaining <= 7 && this.daysRemaining > 0;
});

// Middleware to update status based on end date
membershipSchema.pre('save', function(next) {
  const now = new Date();
  if (this.endDate < now && this.status === 'active') {
    this.status = 'expired';
  }
  next();
});

membershipSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Membership', membershipSchema);