import styled from "styled-components";

function Message({ user, messages }) {
  console.log(messages);
  return (
    <Container>
      <p>{messages.message}</p>
    </Container>
  );
}

export default Message;

const Container = styled.div``;
