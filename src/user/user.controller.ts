import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import axios from 'axios';
import { UserService } from './user.service';
import { StorageService } from 'src/storage/storage.service';
import { CreateUserRequestDto } from './createUser.request.dto';
import { EmailService } from 'src/email/email.service';
import { MqService } from 'src/mq/mq.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly emailService: EmailService,
    private readonly mqService: MqService,
  ) {}

  @Post()
  async createUser(@Body() createUser: CreateUserRequestDto) {
    await this.userService.createUserRecord({
      email: createUser.email,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
    });

    await this.mqService.createMessage();
    await this.emailService.createEmail(createUser.email);
  }

  @Get(':id')
  async getUser(@Param() params) {
    return this.userService.getUserById(params.id);
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param() params, @Res({ passthrough: true }) res) {
    const userRecord = await this.userService.getUserRecordById(params.id);

    let byteArray, mimeType;
    if (userRecord) {
      const file = await this.storageService.getStoredFile(
        userRecord.avatarStorageUrl,
      );
      mimeType = file.mimeType;
      byteArray = file.data;
    } else {
      const user = await this.userService.getUserById(params.id);
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
