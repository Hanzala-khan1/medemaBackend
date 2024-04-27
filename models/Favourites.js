const mongoose = require("mongoose");
const paginate = require('../services/pagination.pulgin');

const userFavouriteSchema = new mongoose.Schema({
  is_add_rehab: {
    type: Boolean,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  rehab_id: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: "RehabList",
  },
  user_id: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userFavouriteSchema.plugin(paginate);

const Favourite = mongoose.model("Favourite", userFavouriteSchema);

module.exports = Favourite;
