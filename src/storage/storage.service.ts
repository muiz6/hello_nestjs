import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as mime from 'mime-types';
import config from 'src/config';

@Injectable()
export class StorageService {
  async createStoredFile(buffer, fileExtension) {
    const fileName = uuidv4() + '.' + fileExtension;
    await fs.writeFile(path.join(config.UPLOAD_DIR, fileName), buffer);
    return fileName;
  }

  async getStoredFile(fileName) {
    const filePath = path.join(config.UPLOAD_DIR, fileName);
    return {
      mimeType: mime.lookup(filePath),
      data: await fs.readFile(path.join(config.UPLOAD_DIR, fileName)),
    };
  }

  async deleteStoredFile(fileName) {
    await fs.unlink(path.join(config.UPLOAD_DIR, fileName));
  }
}
