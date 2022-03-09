const mongooose = require("mongoose");
const Joi = require("joi");

const clientSchema = new mongooose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    cnic: { type: String, required: true },
    plotId: [{ type: mongooose.Schema.Types.ObjectId, ref: "Plot" }],
  },
  { timestamps: true }
);

const validateSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  cnic: Joi.string().required(),
  plotId: Joi.array().items(Joi.string()).required(),
}).options({ allowUnknown: true });

const Client = mongooose.model("Client", clientSchema);

module.exports = { Client, validateSchema };
