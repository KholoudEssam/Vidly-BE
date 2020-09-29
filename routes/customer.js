const express = require('express');
const Joi = require('joi');

const Customer = require('./../models/customer');

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

customerRouter.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`${req.params.id} is not found`);

    res.send(customer);
  } catch (err) {
    return res.status(404).send(`${err.value} is invalid id`);
  }
});

customerRouter.post('/', async (req, res) => {
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

customerRouter.put('/:id', async (req, res) => {
  try {
    const { error } = validateReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`${req.params.id} is not found`);

    customer.name = req.body.name || customer.name;
    customer.isGold = req.body.isGold || customer.isGold;
    customer.phone = req.body.phone || customer.phone;
    customer = await customer.save();
    res.send(customer);
  } catch (err) {
    return res.status(404).send(`${err.value} is invalid id`);
  }
});

customerRouter.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send(`${req.params.id} is not found`);

    res.send(customer);
  } catch (err) {
    return res.status(404).send(`${err.value} is invalid id`);
  }
});

function validateReq(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.number(),
    isGold: Joi.bool(),
  });

  return schema.validate(data);
}

module.exports = customerRouter;
