import { CONFIG } from "@/constants";

export const ProductService = {
  getProducts: async () => {
    try {
      const data = await fetch(`${CONFIG.BASE_URL}`).then((res) => res.json());
      return data;
    } catch (error) {
      throw error;
    }
  },
};
