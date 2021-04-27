import styled from "styled-components";
import Head from "next/head";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <LocalHospitalIcon
          color="secondary"
          style={{ fontSize: 200, marginBottom: 50 }}
        />
        <Button onClick={signIn} variant="outlined">
          Login with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
//
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.3);
`;
