const { Client, validateSchema } = require("../models/client");

module.exports = {
  // create a new client
  async create(req, res, next) {
    // validate the request body
    const { error } = validateSchema.validate(req.body);
    if (error) return next(error);

    try {
      const newClient = Client(req.body);

      // save the client
      await newClient.save((err, client) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, client });
      });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // get all clients
  async getClients(req, res, next) {
    try {
      // get all clients
      const clients = await Client.find({});
      if (!clients) {
        return next(CustomErrorHandler.notFound("Clients not found"));
      }
      res.json({ success: true, clients });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // get a client
  async getClient(req, res, next) {
    try {
      // get a client
      const client = await Client.findById(req.params.id);
      if (!client) {
        return next(CustomErrorHandler.notFound("Client not found"));
      }
      res.json({ success: true, client });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
  // update a client
  async updateClient(req, res, next) {
    // validate the request body
    const { error } = validateSchema.validate(req.body);
    if (error) return next(error);
    try {
      const client = await Client.findByIdAndUpdate(
        req.body._id,
        { ...req.body },
        {
          new: true,
        }
      );
      if (!client) {
        return next(CustomErrorHandler.notFound("Client not found"));
      }
      res.json({ success: true, client });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  },
};
