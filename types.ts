//cart state interface

export interface ICart {
  kidName: string;
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: object;
}


//kid interface
export interface IKid {
  id: number;
  name: string;
}


//approved product state interface
export interface IApprovedProd {
  product: IProduct;
  count: number;
  kids: number[];
}


//* Props interfaces

export interface IKidFilterProps {
  kids: IKid[];
  selectKid: (arg: IKid) => void;
  selectedKid: IKid;
}

export interface IWishListProps {
  cart: ICart[];
  selectedKid: IKid;
  addApproved: (arg: IProduct, selectedKid: IKid) => void;
  approvedProds: IApprovedProd[];
  addRejected: (arg: IProduct, selectedKid: IKid) => void;
  setcount: (arg: number) => void;
}

export interface ICartProps {
  approvedProds: IApprovedProd[];
  setviewPopup: (a: boolean) => void;
  settotal: (obj: { cost: number; discount: number }) => void;
  rejectedProds: IApprovedProd[];
  cart: ICart[];
  count: number;
}

export interface IConfirmProps {
  approvedProds: IApprovedProd[];
  setviewPopup: (a: boolean) => void;
  total: { cost: number; discount: number };
  cart: ICart[];
  rejectedProds: IApprovedProd[];
}
