import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { S3 } from 'aws-sdk';
import { Category } from 'src/category/models/category.model';
import { PaginationQuery } from 'src/interfaces/pagination-quey';
import { UploadedImages } from 'src/interfaces/uploaded-images';
import { AddProductDTO } from 'src/product/dtos/add-product.dto';
import { UpdateProductDTO } from 'src/product/dtos/update-product.dto';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';
import Pagination from 'src/utils/pagination';
import 'dotenv/config';

@Injectable()
export class ProductService {
    
    private readonly s3: S3;

    constructor(
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(Category) private readonly categoryModel: typeof Category,
        @InjectModel(User) private readonly userModel: typeof User
    ) {
        this.s3 = new S3();
    }

    async uploadFileToS3(file: any, key: string): Promise<any> {
        const params: S3.PutObjectRequest = {
            Bucket: process.env.S3_BUKET_NAME,
            Key: key,
            Body: file.buffer,
            // ACL: 'public-read', // Adjust ACL as per your requirement
        };

        const imageObject = await this.s3.upload(params).promise();
        return imageObject;
    }

    async removeImagesFromS3(keys: string[]): Promise<void> {
        // Iterate over each image key and delete from S3 bucket
        const objects = keys.map(key => ({ Key: key }));
        const params: S3.DeleteObjectsRequest = {
        Bucket: process.env.S3_BUKET_NAME,
            Delete: {
                Objects: objects,
            },
        };
        await this.s3.deleteObjects(params).promise();
    }

    async addProduct(addProdutDTO:AddProductDTO,imageFiles:UploadedImages[]): Promise<Product> {
        let {
            name,
            category,
            brand,
            price,
            description,
            inStock
        } = addProdutDTO;
       price = Number(price);
       inStock = inStock ? Boolean(inStock) :true;

        // multiple file upload
        const uploadedFiles = imageFiles;
        const uploadPromises = [];

        // Iterate over each uploaded file
        uploadedFiles.forEach(file => {
            // Create parameters for uploading file to S3
            const key = `products/${file.originalname}-${Date.now()}`;
            // Push upload promise to array
            uploadPromises.push(this.uploadFileToS3(file,key));
        });

        // Wait for all files to upload to S3
        const uploadedObjects = await Promise.all(uploadPromises);

        let images = [];
        let locations = [];

        uploadedObjects.forEach((obj) => {
            images.push(obj.Key);
            locations.push(obj.Location)
        });

        // create 
        const newProduct = await this.productModel.create({
            name,
            categoryId:category,
            brand,
            price,
            description,
            inStock,
            images: images,
            locations: locations,
        });
        return newProduct;
    }

    async getProducts(quey:PaginationQuery):Promise<Product[]>{
        const { skip, limit } = Pagination.getPaginationParams(quey);
        const products = await this.productModel.findAll({
            include:[
                {
                    model: this.categoryModel,
                    attributes: ['id','name']
                    // attributes: { exclude:['createdAt','updatedAt'] }
                },
            ],
            offset: skip,
            limit: limit,
        });
        return products;
    }

    async getProduct(id:string):Promise<Product>{
        const product = await this.productModel.findOne(
            { 
                where:{ id },
                include:[
                    {
                        model:this.categoryModel,
                        attributes: ['id','name']
                    }
                ]
            }
        );
        if(!product){
            throw new NotFoundException('product Not found')
        }
        return product;
    }

    async getProductsByCategory(id:string,query:PaginationQuery):Promise<Product[]>{
        const { skip, limit } = Pagination.getPaginationParams(query);
        const products = await this.productModel.findAll(
            {
                where:{ categoryId:id },
                // include:[
                //     {
                //         model:this.categoryModel,
                //         attributes: ['id','name']
                //     }
                // ]
                offset: skip,
                limit: limit,
            }
        );
        if(products.length == 0){
            throw new NotFoundException('products Not found under this categegory')
        }
        return products;
    }

    async updateProduct(id:string,product:UpdateProductDTO,imageFiles:UploadedImages[]):Promise<Product>{
        let {
                name,
                category,
                brand,
                price,
                description,
                inStock,
        } = product;
        const checkProduct = await this.productModel.findOne({ where:{ id } });
        if(!checkProduct){
            throw new NotFoundException('product not found')
        }
   
        let images = [];
        let locations = [];

        if(imageFiles && imageFiles.length > 3){
            // Remove existing images from S3 bucket
            await this.removeImagesFromS3(checkProduct.images);

            // multiple file upload
            const uploadedFiles = imageFiles;
            const uploadPromises = [];
    
            // Iterate over each uploaded file
            uploadedFiles.forEach(file => {
                // Create parameters for uploading file to S3
                const key = `products/${file.originalname}-${Date.now()}`;
                // Push upload promise to array
                uploadPromises.push(this.uploadFileToS3(file,key));
            });
    
            // Wait for all files to upload to S3
            const uploadedObjects = await Promise.all(uploadPromises);

            uploadedObjects.forEach((obj) => {
                images.push(obj.Key);
                locations.push(obj.Location)
            });
        } else {
            images = checkProduct.images;
            locations = checkProduct.locations;
        }

        // update 
        const productToUpdate = await this.productModel.update(
            {
                name,
                category,
                brand,
                price : price ?  Number(price) : checkProduct.price,
                description,
                inStock : inStock ? Boolean(inStock) :true,
                images: images,
                locations: locations,
            },
            {
                where: { id },
                returning: true,
            }
        );

        const updatedProduct = await this.productModel.findOne(
            { 
                where:{ id },
                include:[
                    {
                        model:this.categoryModel,
                        attributes: ['id','name']
                    }
                ]
            },
        );

        return updatedProduct;
    }

    async deleteProduct(id:string):Promise<any>{
        const checkProduct = await this.productModel.findByPk(id);
        if(!checkProduct){
            throw new NotFoundException('product not found')
        }
        // Remove existing images from S3 bucket
        await this.removeImagesFromS3(checkProduct.images);
        const product = await this.productModel.destroy({ where:{ id } });
        return product;
    }
    
}
