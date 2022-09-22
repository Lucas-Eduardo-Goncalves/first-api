import type { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list: () => Specification[];
  create: (specification: ICreateSpecificationDTO) => void;
  findByName: (name: string) => void;
};

export { ISpecificationsRepository, ICreateSpecificationDTO };