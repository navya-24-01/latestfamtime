// Import the necessary modules and components
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
  // Get the family ID from the props
  const family = props.familyid; 
  console.log("look"); 
  console.log(family); 
  // State to store the family name and members
  const { getFamilyName, getMembersOfFamily } = useFireBase(); 
  const [familyName, setFamilyName] = React.useState(""); 
  const [members, setMembers] = React.useState([]); 
  const navigate = useNavigate(); 
 
  React.useEffect(() => { 
    async function fetchData() { 
      // Retrieve the family name and members using Firebase functions
      const familyName = await getFamilyName(family); 
      const users = await getMembersOfFamily(family); 
      setMembers(users); 
      setFamilyName(familyName); 
    } 
 
    fetchData(); 
  }, [family, getFamilyName, getMembersOfFamily]); 
 
  // Handle click event to navigate to the family homepage
  const handleClick = () => { 
    console.log("enter"); 
    navigate("/familyhomepage", { 
      state: { 
        familyid: family, 
      }, 
    }); 
  }; 
 // Render the component
  return ( 
    <> 
      <Grid item key={family} xs={12} sm={6} md={4}> 
        <Card sx={{ maxWidth: 345 }}> 
        {/* Display the family image */}
          <CardMedia 
            component="img" 
            alt="familypic" 
            height="140" 
            image={familypic} 
          /> 
          <CardContent> 
            {/* Display the family name */}
            <Typography 
              variant="h5" 
              align="center" 
              color="text.secondary" 
              paragraph 
              fontFamily="Boogaloo" 
            > 
              {familyName.toString()} 
            </Typography> 
           {/* Display the list of family members */}
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
          {/* Button to enter the family homepage */}
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
            {/* Component to display family code in a popover */}
            <FamilyCodePopover familyid={family} /> 
          </CardActions> 
        </Card> 
      </Grid> 
    </> 
  ); 
}
