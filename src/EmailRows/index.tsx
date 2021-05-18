import React, { useState } from "react";
import Shiitake from "shiitake";
import { compareDesc } from "date-fns";
import classnames from "classnames";
import { Checkbox } from "../components";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import { htmlStringToText, formatDateByDistance } from "../utils";

import { Email } from "../types/Email.types";
import { MailAppAction } from "../types/MailApp.types";

import "./EmailRows.scss";

interface EmailRowsProps {
  emails: Email[];
  dispatch: React.Dispatch<MailAppAction>;
  openEmail: Email | null;
  search: string;
}

const EmailRows = ({ emails, openEmail, dispatch, search }: EmailRowsProps) => {
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const toggleSelectedEmail = (id: string) => () => {
    const newSelection = new Set(selectedEmails);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedEmails(newSelection);
  };
  const toggleSelectedEmails = () => {
    const newSelection = new Set(selectedEmails);
    if (newSelection.size > 0) {
      newSelection.clear();
    } else {
      emails.forEach((email) => {
        newSelection.add(email.id);
      });
    }
    setSelectedEmails(newSelection);
  };
  const searchedEmails = emails.filter(
    (email) => email.body.includes(search) || email.subject.includes(search)
  );
  return (
    <ul
      className={classnames(
        "o-Grid c-EmailRows h-100vh",
        openEmail && "collapsed"
      )}
    >
      <li
        data-testid="email-row-header"
        className="c-EmailRowHeader o-Flex o-Flex-ai-c"
      >
        <div>
          <Checkbox
            checked={selectedEmails.size > 0}
            onClick={toggleSelectedEmails}
          />
        </div>
        <div className="o-Flex o-Flex-ai-c">
          {selectedEmails.size > 0 && (
            <>
              <button
                onClick={() => {
                  dispatch({ type: "archiveEmails", data: selectedEmails });
                  setSelectedEmails(new Set());
                }}
                className="txt-shade-gray btn-reset o-Flex"
                aria-label="Archive"
              >
                <ArchiveIcon fontSize="small" />
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "deleteEmails", data: selectedEmails });
                  setSelectedEmails(new Set());
                }}
                className="txt-shade-gray btn-reset o-Flex"
                aria-label="Archive"
              >
                <DeleteIcon fontSize="small" />
              </button>
            </>
          )}
        </div>
        <div />
        <div />
        <div />
      </li>
      {searchedEmails.length === 0 && (
        <li className="o-GridElem c-EmailRowNoResults">No results</li>
      )}
      {searchedEmails
        .sort((a, b) => compareDesc(new Date(a["date"]), new Date(b["date"])))
        .map((email) => (
          <li
            data-testid="email-row"
            key={email.id}
            className={classnames(
              "o-GridElem c-EmailRow b-b-1 bc-light-gray",
              openEmail?.id === email.id && "active"
            )}
          >
            <div>
              <Checkbox
                checked={selectedEmails.has(email.id)}
                onClick={toggleSelectedEmail(email.id)}
              />
            </div>
            {openEmail?.id && (
              <button
                className="btn-reset cursor-point"
                onClick={() =>
                  dispatch({ type: "updateOpenEmail", data: email.id })
                }
              >
                <div className="o-Flex o-Flex-ai-c o-Flex-jc-sb">
                  <div className="c-EmailSender">{email.sender}&nbsp;</div>
                  <div className="c-EmailDate o-Flex o-Flex-ai-c txt-gray">
                    {formatDateByDistance(email.date)}
                  </div>
                </div>
                <strong className="c-EmailSubject">
                  {email.subject} <span className="dash">&#8211;</span>
                </strong>
                &nbsp;
                <Shiitake
                  lines={1}
                  throttleRate={200}
                  className="txt-gray"
                  tagName="span"
                >
                  {htmlStringToText(email.body)}
                </Shiitake>
                <div className="c-EmailTags o-Flex o-Flex-ai-c">
                  {email.tags.map((tag) => (
                    <span
                      className="c-EmailTag bg-light-gray txt-dark-gray o-Flex o-Flex-inline o-Flex-ai-c o-Flex-jc-c"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            )}
            {!openEmail?.id && (
              <>
                <div className="c-EmailSender">{email.sender}&nbsp;</div>
                <button
                  className="btn-reset cursor-point o-Flex o-Flex-ai-c"
                  onClick={() =>
                    dispatch({ type: "updateOpenEmail", data: email.id })
                  }
                >
                  <div className="c-EmailTags o-Flex o-Flex-ai-c">
                    {email.tags.map((tag) => (
                      <span
                        className="c-EmailTag bg-light-gray txt-dark-gray o-Flex o-Flex-inline o-Flex-ai-c o-Flex-jc-c"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <strong className="c-EmailSubject">
                    {email.subject} <span className="dash">&#8211;</span>
                  </strong>
                  &nbsp;
                  <Shiitake
                    lines={1}
                    throttleRate={200}
                    className="txt-gray"
                    tagName="span"
                  >
                    {htmlStringToText(email.body)}
                  </Shiitake>
                </button>
                <div className="c-EmailDate txt-gray">
                  {formatDateByDistance(email.date)}
                </div>
              </>
            )}
          </li>
        ))}
    </ul>
  );
};

export default EmailRows;
