// pages/api/upload.js
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import next from 'next';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/files', // The destination directory for uploaded files
        filename: (req, file, cb) => {
         cb(null, file.originalname);
          
        //   return {
        //     msg:"file uploaded success"
        //   }
        },
      }),
    //   fileFilter: (req, file, cb) => {
    //     if (file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    //       cb(null, true);
    //     } else {
    //       cb(null, false);
    //       return cb(new Error('Only DOC files are allowed'));
    //     }
    //   },
 // The destination directory for uploaded files
  
});



export default async function handler(req, res,next) {
    try {

    //   console.log('req',req,'res',res)  
    await upload.single('file')(req, res,next);
  
      // Check if the file upload was successful
    //   if (!req.files) {
    //     console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',req)
    //     res.status(400).json({ success: false, message: 'No file uploaded.' });
    //   } else {
        // console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',error)
        res.status(200).json({ success: true, message: 'File uploaded successfully.' });
    //   }
    } catch (error) {
        console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',error)
      res.status(500).json({ success: false, message: 'File upload failed.' });
    }
  }

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing, as multer will handle it.
  },
};
