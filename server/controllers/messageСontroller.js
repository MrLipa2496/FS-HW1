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
    const { id } = req.params;
    const { body } = req.body;

    if (!body) {
      return next(createHttpError(400, 'Body field is required'));
    }

    const existingMessage = await Message.findById(id);
    if (!existingMessage) {
      return next(createHttpError(404, 'Message Not Found in DB'));
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { body },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return next(createHttpError(404, 'Message Not Found after Update'));
    }

    res.status(200).send({ data: updatedMessage });
  } catch (err) {
    console.error('Error during update:', err);
    next(err);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return next(createHttpError(404, 'Message Not Found'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
