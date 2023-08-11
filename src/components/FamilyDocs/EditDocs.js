import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../config/firebase";
import "./App.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function EditDocs() {
  let navigate = useNavigate();
  const hasMounted = useRef();
  const collectionRef = collection(db, "docsData");
  let params = useParams();
  const [documentTitle, setDocumentTitle] = useState("");
  const [docsDesc, setDocsDesc] = useState("");
  
  const handleQuillChange = (value) => {
    setDocsDesc(value);
  };

  useEffect(() => {
    const updateDocument = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      console.log("#here", document);
      updateDoc(document, {
        docsDesc: docsDesc,
      })
        .then(() => {
          toast.success("Changes Saved", {
            autoClose: 2000,
          });
        })
        .catch(() => {
          toast.error("Cannot Save Changes", {
            autoClose: 2000,
          });
        });
    }, 1000);
    return () => clearTimeout(updateDocument);
  }, [docsDesc, updateDoc]);

  useEffect(() => {
    const getDocData = () => {
      const document = doc(collectionRef, params.id);
      console.log(document);
      onSnapshot(
        document,
        (docs) => {
          setDocumentTitle(docs.data().title);
          setDocsDesc(docs.data().docsDesc);
        },
        [collectionRef, params.id]
      );
    };
    if (hasMounted.current) {
      return;
    }
    hasMounted.current = true;
    getDocData();
  }, [setDocumentTitle, setDocsDesc]);
  //after uncommenting this part, make changes to doc and check once on firebase if it is getting reflected

  return (
    <div className="editDocs-main">
      <div>
        <Button
          variant="outlined"
          sx={{ fontFamily: "Boogaloo" }}
          onClick={() => navigate(-1)}
          size="large"
        >
          <Typography sx={{ fontFamily: "Boogaloo" }} variant="h5">
            Go Back
          </Typography>
        </Button>
      </div>
      <ToastContainer />
      <h1>{documentTitle}</h1>
      <div className="editsDocs-inner" data-testid="quill-editor" >
        <ReactQuill
          className="react-quill"
          value={docsDesc}
          onChange={handleQuillChange}
          data-testid="quill-editor"
        />
      </div>
    </div>
  );
}
