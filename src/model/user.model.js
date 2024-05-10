import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      loweracase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      firstName: { type: String },
      lastName: { type: String },
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: string,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
