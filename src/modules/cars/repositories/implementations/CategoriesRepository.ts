import { Repository } from "typeorm";
import AppDataSource from "../../../../database";
import { Category } from "../../entities/Category";
import type { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
   
  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  };

  async create(props: ICreateCategoryDTO) {
    const category = this.repository.create(props);
    await this.repository.save(category)
  };

  async findByName(name: string) {
    const category = await this.repository.findOne({ where: { name } });
    return category;
  };
}

export { CategoriesRepository };