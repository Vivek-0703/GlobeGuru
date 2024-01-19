import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();
class userDTO{
  id: number;
  username: string;
  email: string;
  name: string;
  

}
@Injectable()
export class AppService {
  // getData(): { message: string } {
  //   return { message: 'Hello API' };
  // }
  async getUsers(){
    const users: userDTO[] =await prisma.user.findMany();
    return users;
  }

  async createUser(data:{username:string, email: string, name: string}){
    const tempUser = await prisma.user.findFirst({
      where: {
        username : data.username
      }
    })
    if(tempUser){
      throw new HttpException('User already Exist', HttpStatus.BAD_REQUEST); 
    }
    const user = await prisma.user.create({
      data: data
    })
    console.log("User Created");
    
    return user;
  }
  

  async updateUser(data:{id: number, username:string, email: string, name: string}){
    const tempUser = await prisma.user.findFirst({
      where: {
        id : data.id
      }
    })
    if(tempUser){
      const user = await prisma.user.update({
        where: {
          id : data.id
        },
        data: data
        
        
      })
      console.log("Update successfull");
      return tempUser;
    }
    throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST)

    
  }
  async deleteUser(id: number){
    const tempUser = await prisma.user.findFirst({
      where: {
        id: id
      }
    })
    if(tempUser){
      const user = await prisma.user.delete({
        where: {
          id: id
        }
      })
      console.log("User successfully Deleted");
      return user;
    }
    throw new HttpException('User oes not exist', HttpStatus.BAD_REQUEST);
  }
}
