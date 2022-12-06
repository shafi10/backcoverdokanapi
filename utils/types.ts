export type GetStatus = {
  status: string;
  message: string;
};

export type unitPrice = {
  price: number;
  unit: string;
  unit_size: number;
};

export type cartInfo = {
  quantity: number;
  productId: string;
  _id?: string;
};
