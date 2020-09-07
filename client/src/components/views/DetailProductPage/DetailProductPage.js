import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage(props) {
  const [Product, setProduct] = useState({});
  const productId = props.match.params.productId;
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setProduct(response.data.product[0]);
        } else {
          alert("상세정보 가져오기 대실패");
        }
      });
  }, []);
  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ProductImage detail={Product} />
        <ProductInfo detail={Product} />
      </div>
    </div>
  );
}

export default DetailProductPage;
