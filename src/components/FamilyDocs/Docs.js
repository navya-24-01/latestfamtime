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
  console.log(familyid);//Output the value of `familyid` for debugging purposes
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [docsData, setDocsData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const collectionRef = collection(db, "docsData");

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

  const getID = (id) => {
    navigate(`/editDocs/${id}`);
  };

  const isMounted = useRef(); // Check if the component has been mounted to avoid redundant data fetching


  useEffect(() => {
    getData();// Fetch data when the component mounts
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      return;// Avoid executing the effect on subsequent re-renders
    }
    isMounted.current = true;
    getData(); // Fetch data only once after the component has mounted
  }, []);

  return (
    <div className="docs-main">
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

      <Modal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addData={addData}
      />
      <div className="grid-main">
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
                  align="center"
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
