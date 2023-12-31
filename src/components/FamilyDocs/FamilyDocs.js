import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NavBar from "../Layout/NavBar";
import { useLocation } from "react-router-dom";
import Docs from "./Docs";
export default function FamilyDocs() {
  const location = useLocation();
  const familyid = location.state.familyid;
  console.log("in family docs", familyid);
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <NavBar />
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          fontFamily="Boogaloo"
        >
          Family Docs
        </Typography>
        <Docs familyid={familyid} />
      </Container>
    </div>
  );
}
