import React, { useContext, useEffect, useState } from "react";
import { decode as atob, encode as btoa } from "base-64";
import { MdContentCopy } from "react-icons/md";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import RevealSecret from "./secretrevealer";
import Redirect from "./redirect";
import { globalStateContext } from "../App";

const Home = () => {
  const [msg, setmsg] = useState("");
  const [link, setLink] = useState("");
  const [secretmessage, setSecretMessage] = useState("");
  const [buttontxt, setbuttontxt] = useState("Copy");
  const [redirect, setRedirect] = useState(false);
  const [isurl, setUrl] = useState(false);
  const navigate = useNavigate();

  const { redlink } = useContext(globalStateContext);

  const linkCollection = collection(db, "links");

  useEffect(() => {
    const { hash } = window.location;
    const myArray = hash.split("#");
    const decoder = myArray[3] === undefined ? hash : myArray[3];
    const message =
      myArray[1] == "txt" ? atob(decoder.replace("#", "")) : myArray[1];

    const getmsg = async () => {
      if (myArray[1] == "fl") {
        if (myArray[2] !== undefined) {
          const data = await getDocs(linkCollection);
          const getmessage = data.docs
            .map((doc) => ({
              ...doc.data(),
              did: doc.id,
            }))
            .filter((doc) => doc.id == myArray[2]);
          if (getmessage.length > 0) {
            setSecretMessage(getmessage[0].url);
            setUrl(true);
          } else {
            navigate("/🔥");
          }
          const linkdoc = doc(db, "links", getmessage[0].did);
          await deleteDoc(linkdoc);
        }
      } else if (myArray[1] == "txt") {
        if (myArray[2] !== undefined) {
          const data = await getDocs(linkCollection);
          const getmessage = data.docs
            .map((doc) => ({
              ...doc.data(),
              did: doc.id,
            }))
            .filter((doc) => doc.id == myArray[2]);
          if (getmessage.length > 0) {
            setSecretMessage(message);
          } else {
            navigate("/🔥");
          }
          const linkdoc = doc(db, "links", getmessage[0]?.did);
          await deleteDoc(linkdoc);
        }
      }
    };
    getmsg();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (redlink !== "") {
      const document = collection(db, "links");
      const docidbefore = doc(document).id;
      const fl = "fl";
      const linkInput = `${window.location}#${fl}#${docidbefore}`;

      setLink(linkInput);
      try {
        await addDoc(linkCollection, {
          url: redlink,
          id: docidbefore,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (msg !== "") {
      const encrypted = btoa(msg);
      const document = collection(db, "links");
      const docidbefore = doc(document).id;
      const txt = "txt";

      const linkInput = `${window.location}#${txt}#${docidbefore}#${encrypted}`;

      setLink(linkInput);
      try {
        await addDoc(linkCollection, {
          link: linkInput,
          count: 0,
          id: docidbefore,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlecopy = (e) => {
    setbuttontxt("Copied");
    setTimeout(() => setbuttontxt(buttontxt), [1000]);
    navigator.clipboard.writeText(e);
  };

  return secretmessage !== "" ? (
    <RevealSecret secretmessage={secretmessage} isurl={isurl} />
  ) : (
    <div className="main">
      <div className="hero">
        <h1 className="main-title">Share a secret </h1>
        <div className="description">
          …with a link that only works one time and then self-destructs.
        </div>
        {link.length > 0 ? (
          <div className="copy-screen">
            <div className="secret-link"> {link}</div>
            <div className="line-br"></div>
            <div className="button-wrapper-2">
              <button
                className="copy-button"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Create New Secret
              </button>
              <button className="copy-button" onClick={() => handlecopy(link)}>
                <MdContentCopy />
                {buttontxt}
              </button>
            </div>
          </div>
        ) : (
          <div className="form-wrapper">
            <div className="selection-wrapper">
              <button className="selection" onClick={() => setRedirect(false)}>
                TEXT
              </button>
              <button className="selection" onClick={() => setRedirect(true)}>
                REDIRECT
              </button>
            </div>
            <form className="secret-form" onSubmit={handleSubmit}>
              <div className="textarea-wrapper">
                {redirect ? (
                  <Redirect />
                ) : (
                  <>
                    <textarea
                      className="secret-input"
                      onChange={(e) => setmsg(e.target.value)}
                      placeholder="Whats your secret ...."
                      maxLength={140}
                    />
                    <div className="charcount">{msg.length}/140</div>
                  </>
                )}
              </div>
              {msg.length >= 140 ? (
                <p className="maxchar">
                  Message must be at most 140 characters
                </p>
              ) : (
                <div />
              )}
              <div className="button-wrapper">
                <button className="create-secret"> Create Secret Link</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
