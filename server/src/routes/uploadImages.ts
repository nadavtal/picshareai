import express, { Request, Response } from "express";
import { body } from "express-validator";
import fs from "fs";
import path from "path";
// import { multerTmpStorage } from "../middlewares/multerDiskStorage";

import Multer from 'multer';
import { sendMail } from "./utils/emails";
import { multerTmpStorage, tmpPath } from "./utils/multerDiskStorage";



const router = express.Router();


const handleImagesRequest = async (req: Request, res: Response) => {
  console.log("Received one request", req.body);
  const { email, folderId } = req.body;
  const userId = req.params.userId;
  console.log("Received one request", { userId, email, folderId });

  try {
    const folderPath = path.join(tmpPath, userId, folderId);
    const filesFromFolder = fs.readdirSync(folderPath);
    console.log("filesFromFolder", filesFromFolder);

    const attachments = filesFromFolder.map((file) => ({
      filename: file,
      path: path.join(folderPath, file),
      content: fs.readFileSync(path.join(folderPath, file)), // Read file content
    }));
    const htmlBody = `
    <h1>New Images Received from PicshareAI</h1>
    <p>Here are the images you uploaded:</p>
    ${filesFromFolder
      .map((_, index) => `<img src="cid:image${index}" alt="Image ${index}" style="max-width: 100%; height: auto;" />`)
      .join("<br/>")}
  `;
    await sendMail({
      recipients: [email],
      subject: "Received new images from GADSSSSSSS",
      subjectText: "New images received from PicshareAI",
      body: htmlBody,
      attachments,
    });
    res.status(200).send({ message: "Email sent successfully" });
    // handleFilesUpload(folderPath, bucketName, filePath, bid, process, emails);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error sending email" });
  }
};

router.post(
  "/api/uploads/files/:userId",
  multerTmpStorage.array("files", 1000),
  handleImagesRequest
);

export { router as uploadImagesRouter };
