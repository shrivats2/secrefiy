import React, { useContext, useEffect, useState } from "react";
import { IoLinkSharp } from "react-icons/io5";
import validator from "validator";
import { globalStateContext } from "../App";

const Redirect = () => {
  const { redlink, setRedLink } = useContext(globalStateContext);
  return (
    <>
      <div className="file-wrapper">
        <div className="link-icon">
          <IoLinkSharp className="linkicon" />
        </div>
        <textarea
          className="redirect-input"
          onChange={(e) => setRedLink(e.target.value)}
          placeholder="example.com"
          maxLength={140}
        />
      </div>
      {!validator.isURL(redlink) ? (
        <div className="validate-url">
          <p className="maxchar">URL does not have a valid URL format</p>
        </div>
      ) : (
        <div className="validate-url">
          The URL to get redirected to (one time).
        </div>
      )}
    </>
  );
};
export default Redirect;
