import { useContext, useEffect, useReducer, useState,useRef } from "react";
import { createUseContext, createWithContext } from "create-use-context";
import { useParams } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store } from "../Store";
import Badge from 'react-bootstrap/Badge';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

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
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  console.log(posts);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const countRef = useRef();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  console.log("state", state, cart?.cartItems.length);

  const addToCartHandler = () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1, ...cart, cart: countRef.current },
    });
    countRef.current = countRef.current+1;
  };

  useEffect(() => {
    if (cart && cart?.cartItems.length>0) {
      localStorage.setItem("localCart", JSON.stringify(cart?.cartItems.length));
    }
  }, [cart]);
  localStorage.setItem("tester", JSON.stringify(cart?.cartItems.length));
  useEffect(() => {
    localCart = JSON.parse(localStorage.getItem("localCart"));
    countRef.current = localCart;
    console.log("countRef inside", countRef);
  }, []);
  console.log("countRef", countRef);
  return (
    <div className="App">
      <h1 style={{ paddingTop: "3rem" }}>Simple Product Table</h1>
      {countRef.current > 0 && (
        <Badge pill bg="danger">
          Cart Items {countRef.current}
        </Badge>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead style={{ backgroundColor: "green", color: "white" }}>
              <tr>
                <th>Product ID</th>
                <th>Title</th>
                <th>Product Description</th>
                <th>Add To Cart</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>
                    <button onClick={addToCartHandler}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

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
