import nodemailer from 'nodemailer';
interface email{
    to: string, 
    name: string, 
    subject: string,
    body: string
}

export default async function sendMail({to,subject,body}:email){
    const password = process.env.SMTP_PASSWORD;
    const email = process.env.SMTP_EMAIL;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    })
    try{
        // const testResult = await transport.verify();
    }
    catch(err){
        console.error(err);
    }

    try{
        const sendResult = await transport.sendMail({
            from: email, to, subject, html:body
        })
    }
    catch(err){
        console.error(err);
    }

}