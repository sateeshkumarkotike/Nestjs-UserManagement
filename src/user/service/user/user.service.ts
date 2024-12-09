import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { S3 } from 'aws-sdk';
import { User } from 'src/user/models/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO } from 'src/user/dtos/register-user.dto';
import { LoginUserDTO } from 'src/user/dtos/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

    private readonly s3: S3;

    constructor(@InjectModel(User) private readonly userModel: typeof User) {
        this.s3 = new S3();
    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    async uploadFileToS3(file: any, key: string): Promise<any> {
        const params: S3.PutObjectRequest = {
            Bucket: 'sateeshbucketnestjsmysql',
            Key: key,
            Body: file.buffer,
            // ACL: 'public-read', // Adjust ACL as per your requirement
        };

        const imageObject = await this.s3.upload(params).promise();
        return imageObject;
    }

    async removeImageFromS3(key: string): Promise<void> {
        const params: S3.DeleteObjectRequest = {
            Bucket: 'sateeshbucketnestjsmysql',
            Key: key,
        };
        await this.s3.deleteObject(params).promise();
    }

    async registerUser(registerUserDTO:RegisterUserDTO,image: any):Promise<User>{
        const { name, email , password } = registerUserDTO;
        const role = registerUserDTO.role  ? registerUserDTO.role : 'viewer';
        const { originalname, buffer } = image;

        // check a user already exists
        let usercheck = await this.userModel.findOne({ where:{ email } })
        if(usercheck){
            throw new BadRequestException('user already exists');
        };

        // convert to hashed password
        let hashedPassword = await this.hashPassword(password);

        const key = `users/${image.originalname}-${Date.now()}`;

        const imageObject = await this.uploadFileToS3(image, key);

        // create 
        const user = await this.userModel.create({
            name,
            email,
            password:hashedPassword,
            image: key,
            location: imageObject.Location,
            role
        });
        return user;
    }
    

    async  loginUser(loginUserDTO:LoginUserDTO):Promise<any>{
        const { email,password } = loginUserDTO;

        let checkUserExist = await this.userModel.findOne({ where:{ email} });
        if(!checkUserExist){
            throw new NotFoundException('user does not exist');
        }

        let checkPassword = await this.comparePasswords(password, checkUserExist.password);
        if(!checkPassword){
            throw new BadRequestException('password is incorrect');
        }

         // create  JWT token and send to client
        let payload = {
            id : checkUserExist.id,
            name : checkUserExist.name,
            email: checkUserExist.email
        };
        let token  =  jwt.sign(payload , process.env.JWT_SECRET_KEY,{ expiresIn: process.env.JWT_LIFETIME });
        return {
            token,
            user: checkUserExist
        }
    }


}
