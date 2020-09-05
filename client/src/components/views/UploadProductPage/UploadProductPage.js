import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { Continents } from "../LandingPage/Sections/Datas";

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {
  const [ProductTitle, setProductTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const ProductTitleChangeHandler = (event) => {
    setProductTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!ProductTitle || !Description || !Price || !Continent || !Images) {
      return alert("모든 값을 입력해 주셔야합니다.");
    }

    const body = {
      writer: props.user.userData._id,
      title: ProductTitle,
      description: Description,
      price: Price,
      continent: Continent,
      images: Images,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품업로드에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("상품업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> 여행 상품 업로드</Title>
      </div>

      <Form>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={ProductTitleChangeHandler} value={ProductTitle} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler}>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
