import { ProductCard } from "@/components/";

export type ProductsGridProps<T> = {
  data: T[];
};

function ProductsGrid<T>({ data }: ProductsGridProps<T>) {
  if (!data?.length) {
    return <div className="text-center text-xl py-10">Data not found</div>;
  }
  return (
    <div className="grid grid-cols-5 gap-5">
      {data?.map((product: any) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsGrid;
