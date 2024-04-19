const catchAsyncError = require("../helpers/catchAsyncError");
const { returnMessage } = require("../utils/utils");
const statusCode = require("../messages/statusCodes.json");
const UserService = require("../services/userService");
const { sendResponse } = require("../utils/sendResponse");
const userService = new UserService();

// User Log In
exports.login = catchAsyncError(async (req, res, next) => {
  const user = await userService.logIn(req?.body);
  sendResponse(
    res,
    true,
    returnMessage("auth", "loggedIn"),
    user,
    statusCode.success
  );
});

// User Sign Up
exports.signup = catchAsyncError(async (req, res, next) => {
  const user = await userService.signUp(req?.body, req?.file);
  sendResponse(
    res,
    true,
    returnMessage("auth", "registered"),
    user,
    statusCode.success
  );
});

// verify User
exports.verifyUser = catchAsyncError(async (req, res, next) => {
  const user = await userService.verifyUser(req?.body);
  sendResponse(
    res,
    true,
    returnMessage("auth", "userVerified"),
    user,
    statusCode.success
  );
});

// User Change Password
exports.changePassword = catchAsyncError(async (req, res, next) => {
  await userService.changePassword(req?.body, req.user._id);
  sendResponse(
    res,
    true,
    returnMessage("auth", "passwordChanged"),
    null,
    statusCode.success
  );
});

// User Get Profile
exports.getProfile = catchAsyncError(async (req, res, next) => {
  const user = await userService.getProfile(req?.user);
  sendResponse(
    res,
    true,
    returnMessage("auth", "profileFetched"),
    user,
    statusCode.success
  );
});

// User Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  await userService.updateProfile(req?.body, req?.user, req?.file);
  sendResponse(
    res,
    true,
    returnMessage("auth", "profileUpdated"),
    null,
    statusCode.success
  );
});

// User Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  await userService.forgotPassword(req?.body);
  sendResponse(
    res,
    true,
    returnMessage("auth", "resetPasswordMailSent"),
    null,
    statusCode.success
  );
});

// User Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  await userService.resetPassword(req?.body);
  sendResponse(
    res,
    true,
    returnMessage("auth", "resetPassword"),
    null,
    statusCode.success
  );
});

// Add Skill
exports.addSkill = catchAsyncError(async (req, res, next) => {
  await userService.addSkill(req?.body);
  sendResponse(
    res,
    true,
    returnMessage("user", "skillAdded"),
    null,
    statusCode.success
  );
});
