export interface Category {
  id: number;
  name: string;
  arName: string;
  imageUrl: string;
}

export interface CategoryFormData {
  name: string;
  arName: string;
  imageUrl: string;
  imagePublicId?: string | null;
  imageFile?: File | null;
}
