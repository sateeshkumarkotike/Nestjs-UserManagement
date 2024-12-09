import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddAddressDTO } from 'src/address/dtos/add-address.dto';
import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto';
import { Address } from 'src/address/models/address.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AddressService {

    constructor(@InjectModel(Address) private readonly addressModel: typeof Address,@InjectModel(User) private readonly userModel: typeof User) {

    }

    async addAddress(addressDTO:AddAddressDTO,decodedUser:any):Promise<Address>{
        // get the form data
        let { doorNoAndVillage,district,state,pincode,landmark,country } = addressDTO;
        let userId = decodedUser.id;
        // create 
        const address = await this.addressModel.create({ 
            userId,
            doorNoAndVillage,
            district,
            state,
            pincode,
            landmark,
            country
        });
        return address;
    }

    async getUserAddressess(decodedUser:any):Promise<any>{
        let userId = decodedUser.id;
        const addresses:any = await this.addressModel.findAll(
            { 
                where:{ userId },
                include: [{ model: this.userModel }], 
                attributes: { exclude: ['password'] }
            },
        );
        // Create an empty object to store users
        let user = {
            userId: '',
            name: '',
            email: '',
            addresses:[]
        };
        // Iterate through the data and group addresses by user ID
        addresses.forEach(address => {
            user = {
                userId: address.user.id,
                name: address.user.name,
                email: address.user.email,
                addresses: [...user.addresses]
            };
            // Add address to the corresponding user
            user.addresses.push({
                addressId: address.id,
                doorNoAndVillage: address.doorNoAndVillage,
                district: address.district,
                state: address.state,
                pincode: address.pincode,
                landmark: address.landmark,
                country: address.country,
                createdAt: address.createdAt,
                updatedAt: address.updatedAt
            });
        });
        return user;
    }

    async getUserSingleAddress(decodedUser:any,id:string):Promise<Address>{
        let userId = decodedUser.id;
        let addressID = id;
        const address = await this.addressModel.findOne(
            { 
                where:{ id:addressID ,userId },
                include: [
                    { 
                        model: this.userModel, as: 'user',
                        attributes: ['name', 'email','id'],
                    },
                ],
            }
        );
        if(!address){
            throw new NotFoundException('address not exists');
        };
        return address;
    }

    async updateAddress(decodedUser:any,id:string,updateAddressDTO:UpdateAddressDTO):Promise<Address>{
        let { doorNoAndVillage,district,state,pincode,landmark } = updateAddressDTO;
        let userId = decodedUser.id;
        let addressID = id;
        const addressCheck = await this.addressModel.findOne({ where:{ id:addressID ,userId } });
        if(!addressCheck){
            throw new NotFoundException('address not exists');
        };

        let address = await this.addressModel.update(
            { 
                doorNoAndVillage,
                district,
                state,
                pincode,
                landmark
            },
            {
                where: { id: addressID, userId },
                returning: true,
            }
        );

        const updatedAddress = await this.addressModel.findOne(
            { 
                where:{ id:addressID ,userId },
                include: [
                    { 
                        model: this.userModel, as: 'user',
                        attributes: ['name', 'email','id'],
                    },
                ],
            },
        );
        return updatedAddress;
    }

    async deleteAddress(decodedUser:any,id:string):Promise<any>{
        let userId = decodedUser.id;
        let addressID = id;
        const addressCheck = await this.addressModel.findOne({ where:{ id:addressID ,userId },});
        if(!addressCheck){
            throw new NotFoundException('address not exists');
        };

        let deletedAddress = await this.addressModel.destroy({  where:{ id:addressID ,userId } });
        return deletedAddress;
    }

}
