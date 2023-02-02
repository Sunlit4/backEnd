import { Message } from "../../models/Message.js";
import MongoDao from "../../contenedor/BaseDao.js";
import connectMongo from "../../config/db.js";

class MessageDaoMongo extends MongoDao{
    constructor(){
        super(connectMongo, Message);
    }

    static getInstance() {
        if (!this.instance) {
          this.instance = new MessageDaoMongo();
        }
        return this.instance;
    }
    
    async addReplyToMessageById(message_id, reply) {
        try {
            await this.model.updateOne(
                { _id: message_id },
                { $push: { replies: reply } }
            );
            return this.getById(message_id);
        }catch (err) {
            throw new Error(err?.message);
        }
    }
}

export default MessageDaoMongo;