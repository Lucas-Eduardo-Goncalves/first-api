import { Category } from "../../model/Category";
import type { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  list() {
    return this.categories;
  };

  create(props: ICreateCategoryDTO) {
    const category = new Category();
  
    Object.assign(category, {
      ...props, 
      created_at: new Date().toDateString(),
    })
    
    this.categories.push(category);
  };

  findByName(name: string) {
    const category = this.categories.find(category => category.name === name);
    return category;
  };
}

export { CategoriesRepository };