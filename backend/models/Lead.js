const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    homeType: { type: String, trim: true },
    sourcePage: { type: String, trim: true },
    message: { type: String, trim: true },
    meta: { type: Object },
    status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', LeadSchema);


