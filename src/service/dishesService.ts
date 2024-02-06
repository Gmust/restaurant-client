import { IFetchSpecialtiesResponse } from '@/@types/dishes';


export class DishesService {

  static async fetchSpecialtiesMenu(): Promise<IFetchSpecialtiesResponse[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes/specialties-menu`,
      { cache: 'no-cache' },
    );
    const specialtiesResponse = await response.json();
    return specialtiesResponse;
  }

}
