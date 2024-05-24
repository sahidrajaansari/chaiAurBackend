import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  // console.log(`Body is :${req.body}`);
  const { fullName, email, password, username } = req.body;

  console.table({
    fullName,
    email,
    password,
    username,
  });

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // console.log(`Files are :${toString(req.files)}`)
  console.log(req.files);

  const exsistedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (exsistedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  
  if (
    req.files &&
    Array.isArray(req.files) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is Required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is Required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  // console.log(`User data is ${user}`);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // console.log(createdUser);

  if (!createdUser) {
    throw new ApiError(500, "Something Went Wrong while Regestring the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registration Successfully"));

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // let coverImageLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.coverImage) &&
  //   req.files.coverImage.length > 0
  // ) {
  //   coverImageLocalPath = req.files.coverImage[0].path;
  // }
});

export { registerUser };
