import { Specification } from "../../model/Specification";
import type { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificatinosRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if(!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  list() {
    return this.specifications;
  };

  create(props: ICreateSpecificationDTO) {
    const specification = new Specification();
  
    Object.assign(specification, {
      ...props, 
      created_at: new Date().toDateString(),
    })
    
    this.specifications.push(specification);
  };

  findByName(name: string) {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  };
}

export { SpecificationsRepository };