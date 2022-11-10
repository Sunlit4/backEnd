import { createTransport } from "nodemailer"; 

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'birdie2@ethereal.email',
        pass: process.env.PASS_EMAIL
    }
});

export default transporter; 