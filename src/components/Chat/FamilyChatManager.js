import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFireBase } from "../../contexts/FireBaseFunctions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NavBar from "../Layout/NavBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Chat } from "./FamilyChat";

// Component for managing family chat
export default function FamilyChatManager() {
  // Get the current location from react-router-dom
  const location = useLocation();

  // State variables for storing members and chat rooms
  const [members, setMembers] = React.useState([]);
  const [chatRooms, setChatRooms] = React.useState([]);

  // Extract the familyid from the location state
  const familyid = location.state.familyid;

  // Get necessary functions from the Firebase context
  const { getMembersOfFamily, getChatRoom, getMyUserName } = useFireBase();

  // State variables for managing chat navigation and user information
  const [value, setValue] = React.useState(familyid);
  const [newArray, setNewArray] = React.useState([]);
  const [user, setUser] = React.useState("");

  // Fetch family members and chat rooms from Firebase
  React.useEffect(() => {
    async function fetchData() {
      const users = await getMembersOfFamily(familyid);
      const username = await getMyUserName();
      setUser(username);

      // Create an array with indexes to keep track of chat rooms
      setNewArray(Array.from({ length: users.length }, (_, index) => index));

      // Fetch chat rooms for each family member (excluding the current user)
      const promises = users.map((user) =>
        user == "me" ? "" : getChatRoom(user, familyid)
      );
      const chatrooms = await Promise.all(promises);

      // Update state with fetched data
      setMembers(users);
      setChatRooms(chatrooms);
    }
    fetchData();
  }, [familyid, getMembersOfFamily, getChatRoom, getMyUserName]);

  return (
    <div>
      <NavBar />
      <br />
      <Container maxWidth="xs" sx={{ borderRadius: "16px" }}>
        <Typography
          variant="h2"
          align="center"
          color="theme.palette.primary.main"
          paragraph
          fontFamily="Boogaloo"
        >
          My Conversations
        </Typography>
      </Container>
      <Box sx={{}}>
        <Container>
          <Chat room={value} user={user} /> {/* Render the chat component */}
        </Container>
        {/* Render the bottom navigation bar for selecting chat rooms */}
        <Paper
          sx={{ position: "fixed", bottom: 3, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue); // Update the selected chat room value
            }}
          >
            <BottomNavigationAction label="The Family Chat" value={familyid} />
            {newArray.map((index) =>
              chatRooms[index] == "" ? null : (
                // Chat rooms for individual family members
                <BottomNavigationAction
                  label={members[index]}
                  value={chatRooms[index]}
                />
              )
            )}
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
