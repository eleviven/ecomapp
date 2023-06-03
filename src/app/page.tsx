import { type NextPage } from "next";
import { ProductsGrid } from "@/sections";
import { useFetchAsync } from "@/hooks";
import { CONFIG } from "@/constants";

const Home: NextPage<any> = async ({ searchParams }) => {
  const url = new URL(`${CONFIG.APP_URL}/api/products`);

  Object.entries(searchParams).forEach(([key, value]: any) =>
    url.searchParams.set(key, value)
  );

  const { products } = await useFetchAsync(url);

  return <ProductsGrid data={products} key={url.pathname} />;
};

export default Home;
