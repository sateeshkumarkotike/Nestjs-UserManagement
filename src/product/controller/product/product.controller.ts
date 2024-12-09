import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IsAdminGuard } from 'src/guards/is-admin/is-admin.guard';
import { IsLoginGuard } from 'src/guards/is-login/is-login.guard';
import { PaginationQuery } from 'src/interfaces/pagination-quey';
import { UploadedImages } from 'src/interfaces/uploaded-images';
import { AddProductDTO } from 'src/product/dtos/add-product.dto';
import { UpdateProductDTO } from 'src/product/dtos/update-product.dto';
import { ProductService } from 'src/product/service/product/product.service';
import { CustomValidationPipe } from 'src/shared/custom-validation/custom-validation.pipe';
import { AuthenticatedRequest } from 'src/utils/auth-request';


@Controller('api/products')
export class ProductController {

    constructor(private productService:ProductService){

    }

    @Post('/')
    @UseInterceptors(FilesInterceptor('images',4))
    @UsePipes(new CustomValidationPipe())
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async addProduct(@UploadedFiles() images: UploadedImages[],@Body() addProdutDTO:AddProductDTO,@Req() request:AuthenticatedRequest):Promise<any>{
        const { user} =  request
        // Check if exactly 4 images are uploaded
        if (!images || images.length !== 4) {
            throw new BadRequestException('Exactly 4 image files are required');
        }
        // Check if each uploaded file is an image
        for (const image of images) {
            const ext = image.originalname.split('.').pop();
            if (!['jpg', 'jpeg', 'png', 'gif','JPG','JPEG','GIF','PNG'].includes(ext.toLowerCase())) {
            throw new BadRequestException('Uploaded file is not an image');
            }
        }

        let product = await this.productService.addProduct(addProdutDTO,images);
        return {
            status:'Success',
            message:'Product added successfully',
            product
        }
    }

    @Get('/')
    async getProducts(@Query() quey:PaginationQuery):Promise<any>{
        let products = await this.productService.getProducts(quey);
        return {
            status:'Success',
            message:'Products fetched successfully',
            products
        }
    }

    @Get('/:id')
    async getProduct(@Param('id') id:string):Promise<any>{
        let product = await this.productService.getProduct(id);
        return {
            status:'Success',
            message:'Product fetched successfully',
            product
        }
    }

    @Get('/category/:id')
    async getProductsByCategory(@Param('id') id:string,@Query() query:PaginationQuery):Promise<any>{
        let products = await this.productService.getProductsByCategory(id,query);
        return {
            status:'Success',
            message:'Product fetched based on category successfully',
            products
        }
    }


    @Put('/:id')
    @UseInterceptors(FilesInterceptor('images',4))
    @UsePipes(new CustomValidationPipe())
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async updateProduct(@Param('id') id:string,@UploadedFiles() images: UploadedImages[],@Body() updateProdutDTO:UpdateProductDTO):Promise<any>{
        // Check if exactly 4 images are uploaded
        if(images && images.length != 0 && images.length !=4 ){
            throw new BadRequestException('Exactly 4 image files are required');
        }
        if(images && images.length == 4){
            for (const image of images) {
                const ext = image.originalname.split('.').pop();
                if (!['jpg', 'jpeg', 'png', 'gif','JPG','JPEG','GIF','PNG'].includes(ext.toLowerCase())) {
                throw new BadRequestException('Uploaded file is not an image');
                }
            }
        }
        let product = await this.productService.updateProduct(id,updateProdutDTO,images);
        return {
            status:'Success',
            message:'Product updated successfully',
            product
        }
    }

    @Delete('/:id')
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async deleteProduct(@Param('id') id:string):Promise<any>{
        let product = await this.productService.deleteProduct(id);
        return {
            status:'Success',
            message:'Product deleted successfully',
            product
        }
    }

}
