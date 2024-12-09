import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomValidationPipe } from 'src/shared/custom-validation/custom-validation.pipe';
import { LoginUserDTO } from 'src/user/dtos/login-user.dto';
import { RegisterUserDTO } from 'src/user/dtos/register-user.dto';
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


}
