// Import necessary modules and components
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
import LogOut from "../Auth/LogOut";

// Define the FamilyChatManager component
export default function FamilyChatManager() {
  // Get the current location and initialize state variables
  const location = useLocation();
  const [members, setMembers] = React.useState([]);
  const [chatRooms, setChatRooms] = React.useState([]);
  const familyid = location.state.familyid;
  const { getMembersOfFamily, getChatRoom, getMyUserName } = useFireBase();
  const [value, setValue] = React.useState(familyid);
  const [newArray, setNewArray] = React.useState([]);
  const [user, setUser] = React.useState("");

  // Fetch data when the component mounts
  React.useEffect(() => {
    async function fetchData() {
      // Get members of the family and the current user's name
      const users = await getMembersOfFamily(familyid);
      const username = await getMyUserName();
      setUser(username);

      // Create an array to store indices of users
      setNewArray(Array.from({ length: users.length }, (_, index) => index));
      // Fetch chat rooms for each user (except the current user)
      const promises = users.map((user) =>
        user == "me" ? "" : getChatRoom(user, familyid)
      );
      // Wait for all the promises to resolve and set state variables
      const chatrooms = await Promise.all(promises);
      setMembers(users);
      setChatRooms(chatrooms);
      // Log the fetched chat rooms
      console.log("here");
      console.log(chatrooms);
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
          <Chat room={value} user={user} />
        </Container>

        <Paper
          sx={{ position: "fixed", bottom: 3, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="The Family Chat" value={familyid} />
            {newArray.map((index) =>
              chatRooms[index] == "" ? null : (
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
