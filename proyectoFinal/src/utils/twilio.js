import twilio from "twilio";
import dotenv from "dotenv"; 

dotenv.config()

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = twilio(accountSid, authToken)

/*client.messages
  .create({ body: "Hello from Twilio", from: "+19294813562", to: process.env.PHONE })
  .then(message => console.log(message.sid));
*/

export default client