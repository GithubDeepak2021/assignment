import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { useParams } from "react-router-dom";
const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  console.log("sluig", slug);
  return <div>Testtt</div>;
};

export default ProductScreen;
