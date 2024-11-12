const { Message } = require('../models');
const createHttpError = require('http-errors');

module.exports.getMessages = async (req, res, next) => {
  const { limit = 20 } = req.query;

  try {
    const foundMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).send({ data: foundMessages });
  } catch (err) {
    next(err);
  }
};

module.exports.updateMessage = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { body },
      { new: true, runValidators: true }
    );
    if (!updatedMessage) {
      return next(createHttpError(404, 'Message Not Found'));
    }

    res.status(200).send({ data: updatedMessage });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
