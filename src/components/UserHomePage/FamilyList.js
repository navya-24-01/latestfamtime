import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import familypic from "../../images/familypic.jpg";
import FamilyCodePopover from "./FamilyCodePopover";
import { useNavigate } from "react-router-dom";
import { useFireBase } from "../../contexts/FireBaseFunctions";

export default function FamilyList(props) {
  const family = props.familyid;
  console.log("look");
  console.log(family);
  const { getFamilyName, getMembersOfFamily } = useFireBase();
  const [familyName, setFamilyName] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      const familyName = await getFamilyName(family);
      const users = await getMembersOfFamily(family);
      setMembers(users);
      setFamilyName(familyName);
    }

    fetchData();
  }, [family, getFamilyName, getMembersOfFamily]);

  const handleClick = () => {
    console.log("enter");
    navigate("/familyhomepage", {
      state: {
        familyid: family,
      },
    });
  };

  return (
    <>
      <Grid item key={family} xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="familypic"
            height="140"
            image={familypic}
          />
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              fontFamily="Boogaloo"
            >
              {familyName.toString()}
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
              fontFamily="Pakaud"
            >
              {members.toString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClick}>
              <Typography
                variant="h6"
                align="center"
                color="theme.palette.primary.main"
                paragraph
                fontFamily="Boogaloo"
              >
                Enter Family
              </Typography>
            </Button>
            <FamilyCodePopover familyid={family} />
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
