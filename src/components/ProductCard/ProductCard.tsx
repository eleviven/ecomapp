import Image from "next/image";

export type ProductCardProps = {
  product: any;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-1">
      <div className="bg-gray-100 aspect-square">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <span>{product.brand}</span>
        <h3>{product.title}</h3>
        <div className="flex items-center justify-between">
          <span>${product.price}</span>
          <span>{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
