import { Email, EmailId } from "./Email.types";

export interface MailAppState {
  emails: Email[];
  archivedEmails: Email[];
  deletedEmails: Email[];
  openEmailId: EmailId | null;
  loading: boolean;
  search: string;
}

export interface MailAppUpdateSearchAction {
  type: "updateSearch";
  data: string;
}

export interface MailAppCloseEmailAction {
  type: "closeEmail";
}

export interface MailAppUpdateEmailsAction {
  type: "updateEmails";
  data: Email[];
}

export interface MailAppDeleteEmailsAction {
  type: "deleteEmails";
  data: Set<EmailId>;
}

export interface MailAppArchiveEmailsAction {
  type: "archiveEmails";
  data: Set<EmailId>;
}

export interface MailAppUpdateOpenEmailAction {
  type: "updateOpenEmail";
  data: EmailId;
}

export interface MailAppFetchErrorAction {
  type: "fetchError";
  data: Error;
}

export type MailAppAction =
  | MailAppUpdateEmailsAction
  | MailAppFetchErrorAction
  | MailAppUpdateOpenEmailAction
  | MailAppCloseEmailAction
  | MailAppDeleteEmailsAction
  | MailAppArchiveEmailsAction
  | MailAppUpdateSearchAction;
