export interface SubCategory {
    id?: number;
    name: string;
    category: { id: number };  // Assuming Category is a separate model with id
  }
  