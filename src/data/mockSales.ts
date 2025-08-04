// src/data/mockSales.ts
export interface MonthlySales {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
}

export const mockMonthlySales: MonthlySales[] = [
  { month: 'Jan', revenue: 4000, profit: 2400, expenses: 1600 },
  { month: 'Feb', revenue: 3000, profit: 1398, expenses: 1602 },
  { month: 'Mar', revenue: 2000, profit: 9800, expenses: -7800 }, // Example of loss
  { month: 'Apr', revenue: 2780, profit: 3908, expenses: -1128 },
  { month: 'May', revenue: 1890, profit: 4800, expenses: -2910 },
  { month: 'Jun', revenue: 2390, profit: 3800, expenses: -1410 },
  { month: 'Jul', revenue: 3490, profit: 4300, expenses: -810 },
];

export interface ProductSales {
    name: string;
    sales: number;
}

export const mockProductSales: ProductSales[] = [
    { name: 'Electronics', sales: 400 },
    { name: 'Apparel', sales: 300 },
    { name: 'Home Goods', sales: 300 },
    { name: 'Books', sales: 200 },
];