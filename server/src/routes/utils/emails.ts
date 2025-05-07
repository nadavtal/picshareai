import nodemailer from "nodemailer";

type Mail = {
  recipients: string | string[];
  subject: string;
  subjectText: string;
  body: string;
  attachments?: any[]; // Adjust the type based on your specific attachment structure
};
// Create a reusable transporter
// console.log("Creating email transporter...", process.env.PICS_GMAIL_USER, process.env.PICS_GMAIL_PASSWORD);


// Function to verify the transporter
export const verifyEmailTransporter = (): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true, // Use secure connection
    host: "smtp.gmail.com",
    port: 465, // Secure port
    auth: {
      user: process.env.PICS_GMAIL_USER,
      pass: process.env.PICS_GMAIL_PASSWORD,
    },
    // auth: {
    //   user: process.env.EMAIL_USER,
    //   pass: process.env.EMAIL_PASS,
    // },
    connectionTimeout: 30000,
  });
  return new Promise((resolve, reject) => {
    transporter.verify((error) => {
      if (error) {
        console.error("Error verifying transporter:", error);
        return reject(error);
      }
      console.log("Email transporter verified successfully.");
      resolve();
    });
  });
};
export const sendMail = ({
  recipients,
  subject,
  subjectText,
  body,
  attachments,
}: Mail): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!recipients) {
      return reject(new Error("No recipients provided for email sending."));
    }
    // if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    //   return reject(
    //     new Error("Email user or password not set in environment variables.")
    //   );
    // }

    const mailOptions = {
      from: `"PicshareAI" <amigady70@gmail.com>`, // Dynamic sender address
      to: recipients,
      subject,
      text: subjectText,
      html: body,
      attachments, // Include attachments
    };
    console.log("Sending email with options:", mailOptions);
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log("Email sent successfully:", info);
        resolve(info);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        reject(error);
      });
  });
};

type CreateMailTemplate = {
  createdAt: Date;
  created_by: string;
  name: string;
  filePath: string;
};

export const createMailTemplate = (data: CreateMailTemplate) => {
  const processFinished = Date.now().toString();
  const baseTemplate = `<div><p>Automated message - don't reply!</></div>
    <a href="https://www.manamapps.com/en/home">
      <img src='https://storage.googleapis.com/3dbia_general/3dbia-icon.jpg' alt="Manam apps" width="200" height="100">
    </a>


  `;

  const footer = `Thank you for using 3DBIA
  <a href="https://www.manamapps.com/en/home">www.manamapps.com</a>
  `;

  return baseTemplate + footer;
};
