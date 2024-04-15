import { $authHost, $unAuthHost } from '@/src/service/index';

export class PromoCodesService {

  static async getAllPromoCodes() {
    try {
      const response = await $unAuthHost.get<IPromoCode[]>('/promo-codes');
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async getPromoCode(promoCodeId: string) {
    try {
      const response = await $unAuthHost.get<IPromoCode>(`/promo-codes/${promoCodeId}`);
      response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async createPromoCode(data: ICreatePromoCodeReq) {
    try {
      const response = await $authHost.post<ICreatePromoCodeRes>('promo-codes', data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async deletePromoCode(promoCodeId: string) {
    try {
      const response = await $authHost.delete<{ message: string }>(`promo-codes/delete-one/${promoCodeId}`);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}
