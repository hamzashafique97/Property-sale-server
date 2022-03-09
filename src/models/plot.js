const mongooose = require("mongoose");
const Joi = require("joi");

const plotSchema = new mongooose.Schema(
  {
    sqft: { type: String, required: true },
    phase: { type: String, required: true },
    catogoery: { type: String, required: true },
    type: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },
    issold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const validateSchema = Joi.object({
  sqft: Joi.string().required(),
  phase: Joi.string().required(),
  catogoery: Joi.string().required(),
  type: Joi.string()
    .valid("Residential", "Commercial")
    .required(),
  issold: Joi.boolean().default(false),
}).options({ allowUnknown: true });

const Plot = mongooose.model("plot", plotSchema);

module.exports = { Plot, validateSchema };
