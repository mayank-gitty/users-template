// pages/api/upload.js
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import next from "next";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/files", // The destination directory for uploaded files
    filename: (req, file, cb) => {
      cb(null, file.originalname);

    },
  }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'application/pdf') {
        console.log('not pdf')
        cb(new Error('Only PDF files are allowed'));
      } else {
        console.log('pdf')
        cb(null, true);
      }
    },
  // The destination directory for uploaded files
});

export default async function handler(req, res, next) {
  try {
    //   console.log('req',req,'res',res)
    await upload.single("file")(req, res, next);

    res
      .status(200)
      .json({ success: true, message: "File uploaded successfully." });
    //   }
  } catch (error) {

    console.log('err',error)
    res.status(500).json({ success: false, message: "File upload failed." });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing, as multer will handle it.
  },
};
