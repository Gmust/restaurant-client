import { ITable } from '@/@types/tables';

export class TablesService {


  static async fetchAllTables() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tables`);
      return await response.json() as ITable[];
    } catch (e) {
      console.error('Failed to fetch all tables');
    }
  }

  static async fetchTableByNum(tableNum: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tables/get-by-number/${tableNum}`);
      return await response.json() as ITable;
    } catch (e) {
      console.error('Failed to fetch table info');
    }
  }

}
