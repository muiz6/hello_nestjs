import { Controller, Delete, Get, NotFoundException, Param, Post, Res } from '@nestjs/common';
import axios from 'axios';
import { UserService } from './user.service';
import { StorageService } from 'src/storage/storage.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) { }

  @Post()
  async createUser() { }

  @Get(':id')
  async getUser(@Param() params) {
    return this.userService.getUserById(params.id);
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param() params, @Res({ passthrough: true }) res) {
    const userRecord = await this.userService.getUserRecordById(params.id);

    let byteArray, mimeType;
    if (userRecord) {
      const file = await this.storageService.getStoredFile(userRecord.avatarStorageUrl);
      mimeType = file.mimeType;
      byteArray = file.data;
    } else {
      const user = await this.userService.getUserById('1');
      const imgResponse = await axios.get(user.avatar, {
        responseType: 'arraybuffer',
      });
      mimeType = imgResponse.headers['content-type'];
      const extension = mimeType.split('/')[1];
      byteArray = new Uint8Array(imgResponse.data);

      const fileUrl = await this.storageService.createStoredFile(
        imgResponse.data,
        extension,
      );
      await this.userService.createUserRecord({
        reqresId: user.id,
        avatarStorageUrl: fileUrl,
      });
    }

    const base64String = Buffer.from(byteArray).toString('base64');
    res.header('Content-Type', mimeType);
    res.send(Buffer.from(base64String, 'base64'));
  }

  @Delete(':id/avatar')
  async deleteUserAvatar(@Param() params) {
    const userRecord = await this.userService.getUserRecordById(params.id);
    if (!userRecord) {
      throw new NotFoundException();
    }
    await this.storageService.deleteStoredFile(userRecord.avatarStorageUrl);
    await this.userService.deleteUserRecord(userRecord.reqresId);
  }
}
