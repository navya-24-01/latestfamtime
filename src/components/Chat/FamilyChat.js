// Import the necessary modules
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Stack from "@mui/material/Stack";
import { AlertTitle, Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Define the Chat component
export const Chat = (props) => {
  const { room, user } = props;// Get the room and user from props
  const [newMessage, setNewMessage] = useState("");// Set the state for new messages
  const messageRef = collection(db, "messages");// Create a reference to the "messages" collection in Firestore
  const [messages, setMessages] = useState([]);// Set the state for messages


  useEffect(() => {
    // Fetch messages from Firestore
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();// Unsubscribe from Firestore snapshot listener when component unmounts
  }, [room, setMessages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage == "") {
      return;
    }

    // Add new message to Firestore
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user,
      room,
    });

    setNewMessage("");// Clear the new message input after submitting
  };

  // Return the Chat component
  return (
    <div>
      <Container maxWidth="xm">
        <>
          <Stack spacing={2} divider={<Divider orientation="horizontal" />}>
            {messages.map((message) => (
              <Alert
                variant="outlined"
                severity="info"
                icon={false}
                sx={{ borderRadius: "16px" }}
              >
                <AlertTitle>
                  <Typography
                    variant="h6"
                    align="center"
                    paragraph
                    fontFamily="Boogaloo"
                  >
                    {message.user}
                  </Typography>
                </AlertTitle>
                <Typography
                  variant="h6"
                  align="center"
                  paragraph
                  fontFamily="Pakaud"
                >
                  {message.text}
                </Typography>
              </Alert>
            ))}
          </Stack>
        </>
        <Container justifyContent="center" sx={{ align: "center" }}>
          <form onSubmit={handleSubmit} className="new-message-form">
            <input
              style={{ width: "1040px" }}
              className="new-message-input"
              placeholder="Enter your message"
              onChange={(event) => setNewMessage(event.target.value)}
              value={newMessage}
            ></input>
            <Box textAlign="center">
              <Button className="send-button" type="submit" variant="outlined">
                <Typography
                  variant="h6"
                  align="center"
                  paragraph
                  fontFamily="Boogaloo"
                >
                  Send
                </Typography>
              </Button>
            </Box>
          </form>
        </Container>
      </Container>
    </div>
  );
};
