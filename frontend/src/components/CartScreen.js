import Badge from "react-bootstrap/Badge";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;


const CartScreen = (props) => {
  const { countRef } = props;
  return (
    <div>
      <Wrapper>
        <Title> Cart Items Count</Title>
        {countRef.current > 0 && (
          <Badge pill bg="danger">
            Cart Items Count {countRef.current}
          </Badge>
        )}
      </Wrapper>
    </div>
  );
};

export default CartScreen;
