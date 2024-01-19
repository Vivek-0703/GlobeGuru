import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all-users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('create-user')
  createUser(@Body() data:{username:string, email: string, name: string}){
    return this.appService.createUser(data);
  }

  @Put('update-user')
  updateUser(@Body() data:{id: number, username:string, email: string, name: string}){
    return this.appService.updateUser(data);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: number){
    return this.appService.deleteUser(+id);
  }
}
