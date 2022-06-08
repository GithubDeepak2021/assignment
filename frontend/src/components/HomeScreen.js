import { useContext, useEffect, useState,useRef } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store } from "../Store";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";
import './Home.scss';


const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(100);
  const [persistedCart, setPersistedCart] = useState();

  let localCart;
  let product;
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const countRef = useRef();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1, ...cart, cart: countRef.current },
    });
    countRef.current = countRef.current+1;
  };

  useEffect(() => {
    if (cart && cart?.cartItems.length>0) {
      localStorage.setItem("localCart", countRef.current);
    }
  }, [cart]);

  useEffect(() => {
    localCart = JSON.parse(localStorage.getItem("localCart"));
    countRef.current = localCart;
  }, []);
  return (
    <div className="App">
      <nav class="navbar navbar-light">Home</nav>
      <h1>Product List Table</h1>
      <CartScreen countRef={countRef} />
      <ProductScreen
        loading={loading}
        currentPosts={currentPosts}
        addToCartHandler={addToCartHandler}
      />
      <div className="pagination-background">
        <Pagination
          activePage={posts}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={posts.length}
          pageRangeDisplayed={posts.length / postsPerPage}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
};;

export default HomeScreen;
