import fs from "fs";
import path from "path";

class FileHelper {
  static saveFile(
    file: ReadableStream<Uint8Array>,
    filename: string,
    updDir: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadDir = path.join(process.cwd(), "public", updDir);

      // Ensure the directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      const writableStream = fs.createWriteStream(filePath);
      const fileReader = file.getReader();

      const pump = () => {
        fileReader
          .read()
          .then(({ done, value }) => {
            if (done) {
              writableStream.end();
              resolve(filePath);
            } else {
              writableStream.write(Buffer.from(value!));
              pump();
            }
          })
          .catch((err) => {
            writableStream.end();
            reject(err);
          });
      };

      pump();

      writableStream.on("error", (err) => {
        writableStream.end();
        reject(err);
      });
    });
  }
}

export default FileHelper;
