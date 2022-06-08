
import { useParams } from "react-router-dom";
import styled, { ThemeProvider }  from "styled-components";

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}

// Define what props.theme will look like
const theme = {
  main: "mediumseagreen"
};


const ProductScreen = (props) => {
  const params = useParams();
  const {loading,currentPosts,addToCartHandler}=props;
  const { slug } = params;
  console.log("sluig", slug);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead style={{ backgroundColor: "green", color: "white" }}>
              <tr>
                <th>Product ID</th>
                <th>Product Title</th>
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
                    <ThemeProvider theme={theme}>
                      <Button onClick={addToCartHandler}>Add To Cart</Button>
                    </ThemeProvider>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
