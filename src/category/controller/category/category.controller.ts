import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CategoryDTO } from 'src/category/dtos/category.dto';
import { CategoryService } from 'src/category/service/category/category.service';
import { IsAdminGuard } from 'src/guards/is-admin/is-admin.guard';
import { IsLoginGuard } from 'src/guards/is-login/is-login.guard';
import { CustomValidationPipe } from 'src/shared/custom-validation/custom-validation.pipe';

@Controller('api/categories')
export class CategoryController {

    constructor(private categoryService:CategoryService){

    }

    @Post('/')
    @UsePipes(new CustomValidationPipe())
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async createCategory(@Body() categoryDTO:CategoryDTO):Promise<any>{
        const category = await this.categoryService.createCategory(categoryDTO);
        return {
            status:'Success',
            message:'Category created Successfully',
            category
        };
    }


    @Get('/')
    async getCategories():Promise<any>{
        const categories = await this.categoryService.getCategories();
        return {
            status:'Success',
            message:'Categories fetched Successfully',
            categories
        };
    }

    @Get('/:id')
    async getCategory(@Param('id') id:string):Promise<any>{
        const category = await this.categoryService.getCategory(id);
        return {
            status:'Success',
            message:'Category fetched Successfully',
            category
        };
    }

    @Put('/:id')
    @UsePipes(new CustomValidationPipe())
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async updateCategory(@Param('id') id:string,@Body() categoryDTO:CategoryDTO):Promise<any>{
        const category = await this.categoryService.updateCategory(id,categoryDTO);
        return {
            status:'Success',
            message:'Category updated Successfully',
            category
        };
    }

    @Delete('/:id')
    @UseGuards(IsLoginGuard,IsAdminGuard)
    async deleteCategory(@Param('id') id:string):Promise<any>{
        const category = await this.categoryService.deleteCategory(id);
        return {
            status:'Success',
            message:'Category deleted Successfully',
            category
        }
    }

}
