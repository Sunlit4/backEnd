import { Schema, model } from "mongoose";

const RespuestaSchema = new Schema({
    user_id: { type: String, require: true},
    email: { type: String, require: true},
    message: { type: String, require: true},
    hour: { type: String, require: true},
    image: { type: String, require: true},
});

const MessageSchema = new Schema({
    user_id: { type: String, require: true},
    email: { type: String, require: true},
    message: { type: String, require: true},
    hour: { type: String, require: true},
    image: { type: String, require: true},
    replies: { type:[RespuestaSchema], default: [] },

});

const Message = model ("Message", MessageSchema);

export { Message, MessageSchema }