const { User, validateSchema } = require("../models/user");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/customErrorHnadler");
const JwtService = require("../services/jwtService");

module.exports = {
  // create a new user
  async create(req, res, next) {
    // validate the request body
    const { error } = validateSchema.validate(req.body);
    if (error) return next(error);

    try {
      // check if the user already exists
      const user = await User.exists({ email: req.body.email });
      if (user) {
        return next(CustomErrorHandler.alreadyExixt("User already exists"));
      }
      const newUser = User(req.body);

      // hash the password
      newUser.password = await bcrypt.hash(newUser.password, 10);

      // save the user
      await newUser.save((err, user) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, user });
      });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // login a user
  async login(req, res, next) {
    // validate the request body
    const authSchema = validateSchema.fork(["name", "userType"], (schema) =>
      schema.optional()
    );
    const { error } = authSchema.validate(req.body);
    if (error) return next(error);

    try {
      // check if the user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.notFound("email not found"));
      }
      // check if the password is correct
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return next(CustomErrorHandler.unauthorized("Invalid Password"));
      }

      // Toekn
      const access_token = JwtService.sign({
        _id: user._id,
        userType: user.userType,
      });
      console.log(access_token);
      
      //jwt store in cookies
      res.cookie("jwt", access_token, { httpOnly: true });

      return res.json({ success: true, access_token });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // get all users
  async getUser(req, res, next) {
    try {
      // get the user list
      const users = await User.find({});
      if (!users) {
        return next(CustomErrorHandler.notFound("Users not found"));
      }
      return res.json({ success: true, users });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // get a user
  async getUserById(req, res, next) {
    try {
      // get the user
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(CustomErrorHandler.notFound("User not found"));
      }
      return res.json({ success: true, user });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // update a user
  async updateUser(req, res, next) {
    console.log(req.body);
    // validate the request body
    const authSchema = validateSchema.fork("password", (schema) =>
      schema.optional()
    );
    const { error } = authSchema.validate(req.body);
    if (error) return next(error);
    try {
      // update the user
      const user = await User.findByIdAndUpdate(
        req.body._id,
        { ...req.body },
        {
          new: true,
        }
      );
      if (!user) {
        return next(CustomErrorHandler.notFound("User not found"));
      }
      return res.json({ success: true, user });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
};
