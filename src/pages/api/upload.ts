import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import useThemeContext from "../../context/context";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log("error", err);
        return reject(err);
      }

    //   console.log("files", fields, files);

    //   console.log("filespath", files["image-file1"][0].filepath);

      var oldPath = files["image-file1"][0].filepath;

      var newPath = `./public/uploads/${files["image-file1"][0].originalFilename}`;

      mv(oldPath, newPath, function (err) {});

      res.status(200).json({ fields, files });
    });
  });
};
