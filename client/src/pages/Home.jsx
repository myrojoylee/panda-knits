import ProductList from "../components/ProductList";
import CategoryNav from "../components/CategoryNav";
import ShoppingCart from "../components/Cart";

export default function Home() {
  return (
    <main>
      <CategoryNav />
      <ProductList />
      <ShoppingCart />
    </main>
  );
}
