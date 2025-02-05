import Message from "../models/MessagesModel.js";
import User from "../models/UserModel.js";
import {mkdirSync, renameSync} from "fs"
import cloudinary from "cloudinary";
// import { v2 as cloudinary } from "cloudinary";




export const getMessages = async (req, res, next) => {
    try {
        const user1 = req.userId
    
      const  user2  = req.body.id;
      console.log(user1, user2)

      if(!user1 || !user2){
        return res.status(400).send("both user ids are required");
      }
    
    

    const messages = await Message.find({
        $or:[
            {
                sender: user1,
                recipient: user2
            },
            {
                sender: user2,
                recipient: user1
            }
        ]
    }).sort({timeStamp:1})

      return res.status(200).json({messages});
    } catch (err) {
      console.log({ err });
      return res.status(500).send("internal server error");
    }
  };


  const uploadFile = async (file) => {
    const image = file
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
        quality: "auto",
        fetch_format: "auto",
        timeout:180000
    });
  
    return uploadResponse.url;
  
  }

  export const uploadFiles = async (req, res, next) => {
    try {
       
        if(!req.file){
            return res.status(400).send("file is required");
        }

        // const date = Date.now();
        // let fileDir = `uploads/files/${date}`;
        // let fileName = `${fileDir}/${req.file.originalname}`;

        // mkdirSync(fileDir, {recursive: true});

        // renameSync(req.file.path, fileName);
        //  console.log(fileName);
        const fileName = await uploadFile(req.file);
      return res.status(200).json({filePath: fileName});
    } catch (err) {
      console.log({ err });
      return res.status(500).send("internal server error");
    }
  };

  

// export const uploadFiles = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const result = await cloudinary.uploader.upload_stream(
//             {
//                 resource_type: "raw", // 👈 Allows PDFs, ZIPs, DOCX, etc.
//                 folder: "uploads/files", // Optional: Organize files in Cloudinary
//                 use_filename: true,
//                 unique_filename: false,
//             },
//             (error, result) => {
//                 if (error) return res.status(500).json({ message: error.message });
//                 console.log("file url", result)

//                 res.status(200).json({ 
//                     message: "File uploaded successfully",
//                     fileUrl: result.secure_url 
//                 });
//             }
//         ).end(req.file.buffer); // 👈 Send the file buffer to Cloudinary
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
