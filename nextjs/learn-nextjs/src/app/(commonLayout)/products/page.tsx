import ProductsCard, { IProducts } from "@/components/Products/ProductsCard";

export default async function ContactPage() {
  // SSG -> Static Site Generation
  /* const res = await fetch("http://localhost:5000/products",{
    cache:'force-cache',
  }); */

  // ISR -> Incremental Static Regeneration)
  /*   const res = await fetch("http://localhost:5000/products", {
    next: {
      revalidate: 5,
    },
  }); */
  // SSR -> Server side Rendering)
  const res = await fetch("http://localhost:5000/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div className="grid grid-cols-3 ">
      {products.map((product: IProducts) => (
        <ProductsCard key={product?.id} product={product} />
      ))}
    </div>
  );
}
