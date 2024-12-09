import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AddAddressDTO } from 'src/address/dtos/add-address.dto';
import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto';
import { AddressService } from 'src/address/service/address/address.service';
import { IsLoginGuard } from 'src/guards/is-login/is-login.guard';
import { CustomValidationPipe } from 'src/shared/custom-validation/custom-validation.pipe';
import { AuthenticatedRequest } from 'src/utils/auth-request';

@Controller('api/address')
export class AddressController {
    constructor(private addressService:AddressService){

    }

    @Post('/')
    @UsePipes(new CustomValidationPipe())
    @UseGuards(IsLoginGuard)
    async addAddress(@Body() addressDTO:AddAddressDTO,@Req() request:AuthenticatedRequest):Promise<any>{
        const { user} =  request;
        let address = await this.addressService.addAddress(addressDTO,user);
        return {
            status:'Success',
            message:'Address added successfully',
            address
        }
    }

    @Get('/')
    @UseGuards(IsLoginGuard)
    async getUserAddressess(@Req() request:AuthenticatedRequest):Promise<any>{
        const { user} =  request;
        let addressess = await this.addressService.getUserAddressess(user);
        return {
            status:'Success',
            message:'Addressess fetched successfully',
            user:addressess
        }
    }

    @Get('/:id')
    @UseGuards(IsLoginGuard)
    async getUserSingleAddress(@Param('id') id:string,@Req() request:AuthenticatedRequest):Promise<any>{
        const { user} =  request;
        let address = await this.addressService.getUserSingleAddress(user,id);
        return {
            status:'Success',
            message:'User Single Address fetched successfully',
            address
        }
    }

    @Put('/:id')
    @UseGuards(IsLoginGuard)
    async updateAddress(@Param('id') id:string,@Req() request:AuthenticatedRequest,@Body() updateAddressDTO:UpdateAddressDTO):Promise<any>{
        const { user} =  request;
        let address = await this.addressService.updateAddress(user,id,updateAddressDTO);
        return {
            status:'Success',
            message:'Address updated successfully',
            address
        }
    }

    @Delete('/:id')
    @UseGuards(IsLoginGuard)
    async deleteAddress(@Param('id') id:string,@Req() request:AuthenticatedRequest):Promise<any>{
        const { user} =  request;
        let address = await this.addressService.deleteAddress(user,id);
        return {
            status:'Success',
            message:'Address deleted successfully',
            address
        }
    }
}
