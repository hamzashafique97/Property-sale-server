const { Plot, validateSchema } = require("../models/plot");
const CustomErrorHandler = require("../services/customErrorHnadler");

module.exports = {
  // create a new plot
  async create(req, res, next) {
    // validate the request body
    const { error } = validateSchema.validate(req.body);
    if (error) return next(error);

    try {
      const newPlot = Plot(req.body);

      // save the plot
      await newPlot.save((err, user) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, user });
      });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // get all plots
  async getPlots(req, res, next) {
    try {
      //page number
      const page = req.params.page || 1;
      if (page < 1)
        return next(CustomErrorHandler.notFound("Page number is invalid"));

      // get the 10 plots per page
      const plots = await Plot.find({})
        .skip((page - 1) * 5)
        .limit(5)
        .sort({ createdAt: -1 });
      const count = await Plot.find({}).countDocuments();

      // return the plots
      return res.json({ success: true, plots, count });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // get a plot
  async getPlot(req, res, next) {
    try {
      // get a plot
      const plot = await Plot.findById(req.params.id);
      if (!plot) {
        return next(CustomErrorHandler.notFound("Plot not found"));
      }
      res.json({ success: true, plot });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // update a plot
  async updatePlot(req, res, next) {
    // validate the request body
    const { error } = validateSchema.validate(req.body);
    if (error) return next(error);

    try {
      const plot = await Plot.findByIdAndUpdate(
        req.body._id,
        { ...req.body },
        {
          new: true,
        }
      );
      if (!plot) {
        return next(CustomErrorHandler.notFound("Plot not found"));
      }
      res.json({ success: true, plot });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
};
