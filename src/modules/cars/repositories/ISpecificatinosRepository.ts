import type { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list: () => Promise<Specification[]>;
  create: (specification: ICreateSpecificationDTO) => Promise<void>;
  findByName: (name: string) => Promise<Specification | null>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
