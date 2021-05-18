import React from "react";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Email } from "../types/Email.types";

import "./Sidebar.scss";

interface SidebarProps {
  emails: Email[];
  archivedEmails: Email[];
  deletedEmails: Email[];
}

const Sidebar = ({ emails, archivedEmails, deletedEmails }: SidebarProps) => {
  const uniqueTags = new Set<string>();
  emails.forEach((email: Email) =>
    email.tags.forEach((tag) => uniqueTags.add(tag))
  );
  return (
    <div className="c-Sidebar b-r-1 bc-light-gray">
      <h1 className="o-Flex o-Flex-ai-c o-Flex-jc-c c-SidebarLogo">
        <AllInboxIcon fontSize="large" /> Anbox
      </h1>
      <ul className="c-SidebarElems">
        <li className="o-Flex o-Flex-ai-c c-SidebarElem active">
          <InboxOutlinedIcon fontSize="small" />
          &nbsp;Inbox ({emails.length})
        </li>
        <li className="o-Flex o-Flex-ai-c c-SidebarElem">
          <ArchiveOutlinedIcon fontSize="small" />
          &nbsp;Archived ({archivedEmails.length})
        </li>
        <li className="o-Flex o-Flex-ai-c c-SidebarElem">
          <DeleteOutlinedIcon fontSize="small" />
          &nbsp;Deleted ({deletedEmails.length})
        </li>
        {Array.from(uniqueTags).map((tag) => (
          <li key={tag} className="o-Flex o-Flex-ai-c c-SidebarElem">
            <LabelOutlinedIcon fontSize="small" />
            &nbsp;{tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
