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
  const isMounted = useRef();
  const collectionRef = collection(db, "docsData");
  let params = useParams();
  const [documentTitle, setDocumentTitle] = useState("");
  const [docsDesc, setDocsDesc] = useState("");
  const getQuillData = (value) => {
    setDocsDesc(value);
  };

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      console.log("#here", document);//Output the document object for debugging purposes
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
    return () => clearTimeout(updateDocsData);
  }, [docsDesc, updateDoc]);

  useEffect(() => {
    const getData = () => {
      const document = doc(collectionRef, params.id);
      console.log(document);//Output the document object for debugging purposes
      onSnapshot(
        document,
        (docs) => {
          setDocumentTitle(docs.data().title);
          setDocsDesc(docs.data().docsDesc);
        },
        [collectionRef, params.id]
      );
    };
    if (isMounted.current) {
      return;// Avoid executing the effect on subsequent re-renders
    }
    isMounted.current = true;
    getData();
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
      <div className="editsDocs-inner">
        <ReactQuill
          className="react-quill"
          value={docsDesc}
          onChange={getQuillData}
        />
      </div>
    </div>
  );
}
