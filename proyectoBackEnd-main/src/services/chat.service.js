import { ChatDAO } from "../DAOS/index.js";
import UserService from "./user.service.js"
import { getHourAndMinutes} from "../utils/index.js"

class MessageService{
    constructor(){}

    async getAllMessages() {
        try {
          return await ChatDAO.getAll();
        } catch (err) {
          throw new Error(err?.message);
        }
      }

    async getMessagesByUserId(user_id) {
        try {
          const { messages } = await UserService.getUserById(user_id);
          return messages;
        } catch (err) {
          throw new Error(err?.message);
        }
    }
    
    async getMessageById(message_id) {
        try {
          return await ChatDAO.getById(message_id);
        } catch (err) {
          throw new Error(err?.message);
        }
    }
    
    async createMessage(body, user_id) {
        try {
          const { email, image } = await UserService.getUserById(user_id);
          const newMessage = {
            user_id,
            email,
            message: body.message,
            hour: getHourAndMinutes(new Date()),
            image,
          };
          const createdMessage = await ChatDAO.create(newMessage);
          await UserService.addMessageToUserById(user_id, createdMessage);
          return createdMessage;
        } catch (err) {
          throw new Error(err?.message);
        }
    }
    
    async addReplyToMessageById(message_id, body, user_replier_id) {
        try {
          const { email, image } = await UserService.getUserById(user_replier_id); // replier
          const { user_id } = await this.getMessageById(message_id);
          const newReply = {
            user_id: user_replier_id, // replier
            email, // replier
            message: body.message,
            hour: getHourAndMinutes(new Date()),
            image,
          };
          const messageUpdated = await ChatDAO.addReplyToMessageById(
            message_id,
            newReply
          );
          let messages = await this.getAllMessages();
          messages = messages.filter((message) => message._id != message_id);
          messages.push(messageUpdated);
          await UserService.updateUserMessagesById(user_id, messages); // creator of message
          return await this.getAllMessages();
        } catch (err) {
          throw new Error(err?.message);
        }
    }
}

export default new MessageService();