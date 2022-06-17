export interface Item {
  ean: string;
  name: string;
  description: string;
}

export class Order {
  id: number = 0;
  items: Item[] = [];
  done?: boolean = false;
}
  
export const items = [
  {
    ean: "12345678",
    name: 'Phone XL',
    description: 'A large phone with one of the best screens'
  },
  {
    ean: "23456781",
    name: 'Phone Mini',
    description: 'A great phone with one of the best cameras'
  },
  {
    ean: "34567812",
    name: 'Phone Standard',
    description: 'Standard phone'
  }
];

export const orders = [
  {
    id: 1238794687923,
    items: [items[0], items[1]]
  },
  {
    id: 2293462873324,
    items: [items[1], items[2]]
  }
];