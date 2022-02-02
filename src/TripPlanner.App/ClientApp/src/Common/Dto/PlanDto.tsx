type PlanDto = {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  created: Date;
  updated: Date;
  numberOfItems: number;
}

export const PlanEmpty: PlanDto = {
  id: 0,
  name: '',
  description: '',
  isPrivate: false,
  created: new Date(),
  updated: new Date(),
  numberOfItems: 0,
};

export default PlanDto;
