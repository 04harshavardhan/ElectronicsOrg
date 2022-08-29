import { useEffect } from "react";
import { useState } from "react";

export default function useProducts() {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);

  function getProduct(productId) {
    const [product] = products.filter((product) => product.id === productId);

    return product;
  }

  useEffect(() => {
    (async () => {
      setLoadingProducts(() => true);
      try {
        const query = await fetch(
          "https://electronicsorg.herokuapp.com/products"
        );
        const { products } = await query.json();

        setProducts(() => products);
        setLoadingProducts(() => false);
      } catch (error) {
        console.log(error);
      }

      // const productsCollection = await fetchProducts();

      // const productsList = [];

      // for (const i in productsCollection) {
      //   if (Object.hasOwnProperty.call(productsCollection, i)) {
      //     const doc = productsCollection[i];

      //     const data = doc.data();
      //     const imgUrl = await getImgUrl(data.imgPath);

      //     productsList.push({
      //       id: doc.id,
      //       name: data.name,
      //       price: data.price,
      //       priceId: data.priceId,
      //       rating: data.rating,
      //       image: imgUrl,
      //     });
      //   }
      // }

      // setProducts(() => productsList);
    })();
  }, []);

  return { products, getProduct, loadingProducts };
}
