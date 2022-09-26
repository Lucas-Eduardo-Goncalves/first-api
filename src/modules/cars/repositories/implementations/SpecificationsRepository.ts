import { Repository } from "typeorm";
import AppDataSource from "../../../../database";
import { Specification } from "../../entities/Specification";
import type {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificatinosRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async list() {
    const specifications = await this.repository.find();
    return specifications;
  }

  async create(props: ICreateSpecificationDTO) {
    const category = this.repository.create(props);
    await this.repository.save(category);
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ where: { name } });
    return specification;
  }
}

export { SpecificationsRepository };
