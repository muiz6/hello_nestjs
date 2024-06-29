import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import config from 'src/config';
import * as path from 'path';

@Injectable()
export class StorageService {
  async createStoredFile(buffer, fileExtension) {
    const fileName = uuidv4() + '.' + fileExtension;
    await writeFile(path.join(config.UPLOAD_DIR, fileName), buffer);
    return fileName;
  }

  async f(fileName) {
    const f = await readFile(path.join(config.UPLOAD_DIR, fileName));
  }
}
