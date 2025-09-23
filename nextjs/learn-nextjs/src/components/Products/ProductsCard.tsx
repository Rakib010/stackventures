import Image from "next/image";

export interface IProducts {
  id: number;
  product_name: string;
  brand: string;
  price: number;
  image: string;
}

export default function ProductsCard({ product }: { product: IProducts }) {
  return (
    <div className="border rounded-xl p-4  transition ">
      <Image
        src={product.image}
        alt={product.product_name}
        width={300}
        height={200}
        className="rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{product.product_name}</h2>
      <p className="text-sm text-gray-600">Brand: {product.brand}</p>
      <p className="text-sm text-gray-500">ID: {product.id}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
    </div>
  );
}
