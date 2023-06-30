import { AuthProvider } from "../contexts/AuthContext";
import SignUp from "./Auth/SignUp";
import WelcomePage from "./WelcomePage";
import LogIn from "./Auth/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FamilyMenu from "./UserHomePage/FamilyMenu";
import PrivateRoute from "./Auth/PrivateRoute";
import ProfilePage from "./Auth/ProfilePage";
import FamilyHomePage from "./FamilyHomePage";
import { FunctionProvider } from "../contexts/FireBaseFunctions";
import FamilyDocs from "./FamilyDocs/FamilyDocs";
import FamilyChatManager from "./Chat/FamilyChatManager";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditDocs from "./FamilyDocs/EditDocs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#61a5c2",
    },

    secondary: {
      main: "#293241",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <FunctionProvider>
            <Routes>
              <Route exact path="/" Component={WelcomePage} />
              <Route exact path="/signup" Component={SignUp} />
              <Route exact path="/signin" Component={LogIn} />
              <Route
                path="/familymenu"
                element={
                  <PrivateRoute>
                    <FamilyMenu />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/familychatmanager"
                element={
                  <PrivateRoute>
                    <FamilyChatManager />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/editDocs/:id"
                element={
                  <PrivateRoute>
                    <EditDocs />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/profilepage"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              ></Route>
              <Route exact path="/familyhomepage" Component={FamilyHomePage} />
              <Route exact path="/familydocs" Component={FamilyDocs}></Route>
            </Routes>
          </FunctionProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
