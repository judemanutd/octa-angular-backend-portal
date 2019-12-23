import { Category } from './Category';

export interface Technology {
  id: string;
  name: string;
  category: Category;
  icon: {
    type: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
