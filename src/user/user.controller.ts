import { Controller, Delete, Get, Param } from '@nestjs/common';
import axios from 'axios';
import { UserService } from './user.service';
import { StorageService } from 'src/storage/storage.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) { }

  @Get(':id')
  async getUser(@Param() params) {
    return this.userService.getUserById(params.id);
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param() id: string) {
    const userRecord = this.userService.getUserRecordById(id);

    let imgResponse;
    if (!userRecord) {
      const user = await this.userService.getUserById('1');
      imgResponse = await axios.get(user.avatar, {
        responseType: 'arraybuffer',
      });
      const extension = (imgResponse.headers['content-type'] as any).split('/')[1];
      const fileUrl = await this.storageService.createStoredFile(
        imgResponse.data,
        extension,
      );
      await this.userService.createUser({
        reqresId: user.id,
        avatarStorageUrl: fileUrl,
      });
    }

    const byteArray = new Uint8Array(imgResponse.data);
    const base64String = Buffer.from(byteArray).toString('base64');
    return base64String;
  }

  @Delete(':id/avatar')
  async deleteUserAvatar(@Param() id: string) { }
}
