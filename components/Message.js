import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

function Message({ user, messages }) {
  const [LoggedInUser] = useAuthState(auth);

  const MessageType = user === LoggedInUser.email ? Sender : Reciver;
  return (
    <Container>
      <MessageType>
        {messages.message}
        <TimeStamp>
          {messages.timestamp ? moment(messages.timestamp).format("LT") : "..."}
        </TimeStamp>
      </MessageType>
    </Container>
  );
}

export default Message;

const Container = styled.div``;
//
const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 10px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
//
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #cbc6f8;
`;
//
const Reciver = styled(MessageElement)`
  text-align: left;
  background-color: white;
`;
//
const TimeStamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
