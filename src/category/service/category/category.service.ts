import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryDTO } from 'src/category/dtos/category.dto';
import { Category } from 'src/category/models/category.model';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {

    }

    async createCategory(categoryDTO:CategoryDTO):Promise<Category>{
        let checkCategoryExists = await this.categoryModel.findOne({ where:{ name: categoryDTO.name } });
        if(checkCategoryExists){
            throw new BadRequestException('Category already exists');
        }

        let category = await this.categoryModel.create({ name:categoryDTO.name });

        return category;
    }

    async getCategories():Promise<Category[]>{
        let categories = await this.categoryModel.findAll({ });
        return categories;
    }

    async getCategory(id:string):Promise<Category>{
        let category = await this.categoryModel.findOne(
            { 
                where:{ id } 
            }
        );
        if(!category){
            throw new NotFoundException('Category does not exist');
        }
        return category;
    }

    async updateCategory(id:string,categoryDTO:CategoryDTO):Promise<Category>{
        const { name } = categoryDTO;
        let checkCategory = await this.categoryModel.findOne({ where:{ id } });
        if(!checkCategory){
            throw new NotFoundException('Category does not exist');
        }
        let updateCategory = await this.categoryModel.update(
            { name },
            {
                where: { id: id  },
                returning: true,
            }
        );
        let category = await this.categoryModel.findOne({ where:{ id } });
        return category;
    }

    async deleteCategory(id:string):Promise<any>{
        let checkCategory = await this.categoryModel.findOne({ where:{ id } });
        if(!checkCategory){
            throw new NotFoundException('Category does not exist');
        }
        let category = await this.categoryModel.destroy({ where:{ id } });
        return category;
    }
}
