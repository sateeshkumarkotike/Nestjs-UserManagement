import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsAdminGuard } from 'src/guards/is-admin/is-admin.guard';
import { IsLoginGuard } from 'src/guards/is-login/is-login.guard';
import { CustomValidationPipe } from 'src/shared/custom-validation/custom-validation.pipe';
import { LoginUserDTO } from 'src/user/dtos/login-user.dto';
import { RegisterUserDTO } from 'src/user/dtos/register-user.dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('api/users')
export class UserController {

    constructor(private userService:UserService){

    }

    @Post('/register')
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new CustomValidationPipe())
    async registerUser(@UploadedFile() image: any,@Body() registerUserDTO:RegisterUserDTO):Promise<any>{
        if (!image) {
            throw new BadRequestException('Image is required');
        }

        // Check if the provided file is an image
        if (!image.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)) {
            throw new BadRequestException('Only image files are allowed');
        }

        const user = await this.userService.registerUser(registerUserDTO,image);
    
        return {
            status: 'success',
            messaage: 'user registred successfully',
            user
        }
    }

    @Post('/login')
    @UsePipes(new CustomValidationPipe())
    async loginUser(@Body() loginUserDTO:LoginUserDTO){
      const user = await this.userService.loginUser(loginUserDTO);
      return { 
        status:'Success',
        message:'User logged Successfully',
        ...user
      }
    }


    // for admin
    @Get('/')
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async getAllUsers(){
      const users = await this.userService.getAllUsers();
      return {
        status:'Success',
        message:'All users fetched successfully',
        users
      }
    }

    @Get('/:id')
    @UseGuards(IsLoginGuard)
    async getUserById(@Param('id') id:string){
      const user = await this.userService.getUserById(id);
      return {
        status:'Success',
        message:'user fetched successfully',
        user
      }
    }


    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new CustomValidationPipe())
    @UseGuards(IsLoginGuard)
    async updateUserById(@UploadedFile() image: any,@Body() updateUserDTO:UpdateUserDTO,@Param('id') id:string){
      if (!image) {
        throw new BadRequestException('Image is required');
      }
  
      // Check if the provided file is an image
      if (!image.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)) {
        throw new BadRequestException('Only image files are allowed');
      }
      const user = await this.userService.updateUserById(updateUserDTO,id,image);
      return {
        status:'Success',
        message:'users updated successfully',
        user
      }
    }

    
    @Delete('/:id')
    @UseGuards(IsLoginGuard)
    async deleteUserById(@Param('id') id:string){
      const user = await this.userService.deleteUserById(id);
      return {
        status:'Success',
        message:'users deleted successfully',
        user
      }
    }


}
