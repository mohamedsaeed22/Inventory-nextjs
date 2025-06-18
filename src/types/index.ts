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

export type Category = {
  name: string;
  number: string;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string | null;
  lastModifiedUserId: string | null;
  lastModifiedUser: string | null;
  lastModifiedDate: string | null;
  isDeleted: boolean;
  id: number;
};

export type Expense = {
  id: number;
  existingItemId: number;
  existingItem: ExistingItem;
  dispensedQuantity: number;
  receiverName: string;
  deliveredName: string;
  toWhom: string;
  notes: string | null;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
};

export type Loan = {
  id: number;
  createdDate: string;
  name: string;
  toWhom: string;
  isReturned: boolean;
  notes: string;
  existingItemId: number;
};
