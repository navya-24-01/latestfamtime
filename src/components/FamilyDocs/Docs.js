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

  const getDocData = async () => {
    const q = query(collectionRef, where("familyid", "==", familyid));

    onSnapshot(q, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };
  const addDocument = () => {
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

  const getToEditDocs = (id) => {
    navigate(`/editDocs/${id}`);
  };

  const hasMounted = useRef(); //check first if because of useEffect hook the data is being rendered twice

  useEffect(() => {
    getDocData();
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    hasMounted.current = true;
    getDocData();
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
        addDocument={addDocument}
        data-testid= "modal"
      />
      <div className="grid-main">
        {docsData.map((doc) => {
          return (
            <div className="grid-child" onClick={() => getToEditDocs(doc.id)}>
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
