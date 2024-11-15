const { Router } = require('express');
const { messageController } = require('../controllers');

const messageRouter = Router();

messageRouter.get('/', messageController.getMessages);
messageRouter.patch('/:id', messageController.updateMessage);
messageRouter.delete('/:id', messageController.deleteMessage);

module.exports = messageRouter;
