const { Router } = require('express');
const { messageController } = require('../controllers');

const messageRouter = Router();

messageRouter.get('/', messageController.getMessages);
messageRouter.put('/messages/:id', messageController.updateMessage);
messageRouter.delete('/messages/:id', messageController.deleteMessage);

module.exports = messageRouter;
