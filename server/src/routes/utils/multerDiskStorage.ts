import multer, { StorageEngine } from 'multer';
import fs from 'fs';
import path from 'path';
import { Request } from 'express';

// console.log("__dirname", __dirname)
export const tmpPath = path.join(__dirname, "../resources");
// const unzipPath = path.join(__dirname, '../../../resources/static/assets/unzipped/');
// console.log('tmpPath', tmpPath);
// console.log('unzipPath', unzipPath);
function createMulterStorage(tmpDir: string): StorageEngine {
  return multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      const dir = path.join(tmpDir, req.params.userId, req.body.folderId);
      console.log('dir', dir);
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log('Directory is created.', dir);
        }
      } catch (err) {
        return cb(err as Error, tmpDir); // Cast err to Error
      }
      cb(null, dir);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      cb(null, file.originalname);
    },
  });
}

const multerTmpStorage = multer({
  storage: createMulterStorage(tmpPath),
  limits: { fileSize: 1000000 * 1000 * 10 },
});

// const multerZipStorage = multer({
//   storage: createMulterStorage(unzipPath),
//   limits: { fileSize: 1000000 * 1000 * 10 },
// });

export {
  multerTmpStorage,
  // multerZipStorage,
  // tmpPath,
  // unzipPath,
};