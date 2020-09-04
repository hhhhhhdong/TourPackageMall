import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { RocketOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import ImageSlider from "../../utils/ImageSlider";
const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      moreLoad: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.moreLoad) {
          setProducts([...Products, ...response.data.productInfo]);
          console.log(response.data.productInfo);
        } else {
          setProducts(response.data.productInfo);
          console.log(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    });
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card hoverable cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={product.description} />
        </Card>
      </Col>
    );
  });
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketOutlined />
        </h2>
      </div>
      <Row gutter={[16, 16]}>{renderCards}</Row>

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default withRouter(LandingPage);
