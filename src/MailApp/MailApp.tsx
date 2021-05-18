import React, { useReducer, useEffect } from "react";
import { apiGet } from "../api";
import { MailAppState } from "../types/MailApp.types";
import mailAppReducer from "./mailAppReducer";
import SearchIcon from "@material-ui/icons/Search";

import Sidebar from "../Sidebar";
import EmailRows from "../EmailRows";
import EmailPreview from "../EmailPreview";

import "./MailApp.scss";

const initialState: MailAppState = {
  emails: [],
  archivedEmails: [],
  deletedEmails: [],
  loading: true,
  openEmailId: null,
  search: "",
};

const MailApp = () => {
  const [state, dispatch] = useReducer(mailAppReducer, initialState);
  const {
    search,
    openEmailId,
    emails,
    archivedEmails,
    deletedEmails,
    loading,
  } = state;
  useEffect(() => {
    apiGet(false).then(({ data, success }) => {
      if (success) {
        dispatch({ type: "updateEmails", data: data.messages });
      } else {
        dispatch({ type: "fetchError", data });
      }
    });
  }, []);

  const openEmail = emails.find((email) => email.id === openEmailId) || null;
  if (loading) {
    return <div>Loading...</div>;
  }
  /* 
    This is needed because typescript isn't sure how to parse CSS Variables
  */
  const style: any = {
    "--grid-columns": "auto-fit",
    "--grid-min-size": "50%",
  };

  return (
    <div className="c-MailApp">
      <div className="c-MailAppHeader b-b-1 bc-light-gray">
        <div className="c-MailAppSearch o-Flex o-Flex-ai-c bg-light-gray txt-gray">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={(e) =>
              dispatch({ type: "updateSearch", data: e.target.value })
            }
            placeholder="Search mail..."
          />
        </div>
      </div>
      <Sidebar
        emails={emails}
        archivedEmails={archivedEmails}
        deletedEmails={deletedEmails}
      />
      <div className="o-Grid c-MailAppMain">
        <div className="o-GridElem h-100vh" style={style}>
          <EmailRows
            search={search}
            emails={emails}
            dispatch={dispatch}
            openEmail={openEmail}
          />
          <EmailPreview email={openEmail} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default MailApp;
