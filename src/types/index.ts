export type ExistingItem = {
  name: string;
  imagePath: string | null;
  brand: string;
  serial: string;
  notes: string | null;
  quantity: number;
  quantityEnum: string;
  sqId: number;
  sq: string | null;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
};
