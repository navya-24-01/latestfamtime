// Import the necessary modules and components
import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import "./App.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import familydoc from "../../images/familydocs.jpg";

export default function Docs(props) {
  const familyid = props.familyid;
  //console.log(familyid);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [docsData, setDocsData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const collectionRef = collection(db, "docsData");

  // Fetch data from Firebase and update docsData state using onSnapshot
  const getData = async () => {
    const q = query(collectionRef, where("familyid", "==", familyid));

    onSnapshot(q, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };
  // Add new document to the Firebase collection
  const addData = () => {
    addDoc(collectionRef, {
      title: title,
      docsDesc: "",
      familyid,
    })
      .then(() => {
        alert("Document Added");
        handleClose();
      })
      .catch(() => {
        alert("Document Cannot be Added");
      });
  };

  // Navigate to the document editor page
  const getID = (id) => {
    navigate(`/editDocs/${id}`);
  };

  const isMounted = useRef(); //check first if because of useEffect hook the data is being rendered twice

  useEffect(() => {
    getData();
  }, []);

  // Fetch data from Firebase when the component mounts and avoid duplicate renders
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  }, []);

  return (
    <div className="docs-main">
       {/* Button to add a new document */}
      <Button
        variant="outlined"
        sx={{ fontFamily: "Boogaloo" }}
        onClick={handleOpen}
        size="large"
      >
        <Typography sx={{ fontFamily: "Boogaloo" }} variant="h5">
          Add a document
        </Typography>
      </Button>

       {/* Modal to add a new document */}
      <Modal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addData={addData}
        data-testid= "modal"
      />
      <div className="grid-main">
        {/* Render each document as a Card */}
        {docsData.map((doc) => {
          return (
            <div className="grid-child" onClick={() => getID(doc.id)}>
              <Card>
                <CardMedia
                  component="img"
                  alt="familydoc"
                  height="140"
                  image={familydoc}
                />
                <Typography
                  variant="h5"
                  textAlign="center"
                  color="text.secondary"
                  paragraph
                  fontFamily="Boogaloo"
                >
                  {doc.title}
                </Typography>

                <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
