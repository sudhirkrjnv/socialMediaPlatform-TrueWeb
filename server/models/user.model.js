import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    name: { type: String, default: "" },
    bio: { type: String, default: "" },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    workEducation: {
      university: { type: String, default: "" },
      college: { type: String, default: "" },
      school: { type: String, default: "" },
    },
    locations: {
      currentLocation: { type: String, default: "" },
      permanentLocation: { type: String, default: "" },
    },
    contactInfo: {
      whatsapp: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    familyRelationships: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
