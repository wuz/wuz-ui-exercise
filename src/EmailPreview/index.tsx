import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { DangerousHtmlBody, Button } from "../components";
import { Email } from "../types/Email.types";
import { MailAppAction } from "../types/MailApp.types";
import { formatDateByDistance } from "../utils";

import "./EmailPreview.scss";

interface EmailPreviewProps {
  email: Email | null;
  dispatch: React.Dispatch<MailAppAction>;
}

const EmailPreview = ({ email = null, dispatch }: EmailPreviewProps) => {
  if (!email) return null;
  return (
    <div className="c-EmailPreview b-l-1 bc-light-gray h-100vh">
      <div className="c-EmailPreviewToolbar o-Flex o-Flex-ai-c">
        <Button
          onClick={() => dispatch({ type: "closeEmail" })}
          aria-label="Close email"
        >
          <CloseIcon fontSize="small" />
        </Button>
      </div>
      <div className="o-Flex o-Flex-ai-c o-Flex-jc-sb">
        <h1 data-testid="email-subject">{email.subject}</h1>
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
      </div>
      <p className="o-Flex o-Flex-ai-c o-Flex-jc-sb b-b-1 bc-light-gray">
        <strong data-testid="email-sender">{email.sender}</strong>
        <span className="txt-gray">{formatDateByDistance(email.date)}</span>
      </p>
      <div data-testid="email-body">
        <DangerousHtmlBody>{email.body}</DangerousHtmlBody>
      </div>
    </div>
  );
};

export default EmailPreview;
