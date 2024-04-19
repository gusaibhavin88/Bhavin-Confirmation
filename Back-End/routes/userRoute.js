const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const validatorFunc = require("../utils/validatorFunction.helper");
const { protect } = require("../middlewares/authUserMiddleware");
const { validateUserRegistration } = require("../validators/user.validator");
const { checkProfileSize, upload } = require("../helpers/multer");
const adminController = require("../controllers/adminController");

userRoute.post("/login", userController.login);
userRoute.post("/forgot-password", userController.forgotPassword);
userRoute.post("/reset-password", userController.resetPassword);
userRoute.post(
  "/signup",
  checkProfileSize,
  upload.single("profile_image"),
  validateUserRegistration,
  validatorFunc,
  userController.signup
);
userRoute.post("/verify-user", userController.verifyUser);
userRoute.post("/get-skills", adminController.skillList);

userRoute.use(protect);

userRoute.post("/change-password", userController.changePassword);
userRoute.get("/get-profile", userController.getProfile);
userRoute.put(
  "/update-profile",
  checkProfileSize,
  upload.single("profile_image"),
  userController.updateProfile
);
userRoute.post("/add-skill", userController.addSkill);

module.exports = userRoute;
