import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
import firebase from "firebase/app";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          messages={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // Update last seen...
    db.collection("doctors").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoUrl: user.photoURL,
    });

    setInput("");
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInfo>
          <h3>email@site.com</h3>
          <p>Last Seen:</p>
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {/* SHow messages */}
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
        />
        <IconButton disabled={!input} onClick={sendMessage}>
          <SendIcon />
        </IconButton>
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        ></button>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
//
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
//
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
//
const HeaderIcons = styled.div``;
//
const MessageContainer = styled.div`
  padding: 30px;
  background-color: whitesmoke;
  min-height: 90vh;
`;
//
const EndOfMessage = styled.div``;
//
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
//
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 15px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
