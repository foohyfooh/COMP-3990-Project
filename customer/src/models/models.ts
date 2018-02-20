interface Session {
  id: number;
  uuid: string;
}

interface Order {
  order: number;
}

interface MenuCategory {
  id: number;
  name: string;
  count: number;
}

interface MenuItem {
  id: number;
  name: string;
  category: number;
  description: string;
  cost: number;
}

interface OrderItem {
  id: number;
  name: string;
  cost: number;
  status: number;
}