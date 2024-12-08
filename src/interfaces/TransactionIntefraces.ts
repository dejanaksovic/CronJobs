interface orderItem {
  Article: {
    _id: string;
  };
  Quantity: number;
}

export interface ITransaction {
  User: {
    _id: string;
  };
  Order: [orderItem];
  Coins: number;
  createdAt: string;
}
