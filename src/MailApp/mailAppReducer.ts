import { MailAppState, MailAppAction } from "../types/MailApp.types";

const mailAppReducer = (
  state: MailAppState,
  action: MailAppAction
): MailAppState => {
  let emails;
  switch (action.type) {
    case "updateSearch":
      return { ...state, search: action.data };
    case "updateEmails":
      return { ...state, loading: false, emails: action.data };
    case "updateOpenEmail":
      return { ...state, loading: false, openEmailId: action.data };
    case "closeEmail":
      return { ...state, openEmailId: null };
    case "deleteEmails":
      const deletedEmails = state.emails.filter((email) =>
        action.data.has(email.id)
      );
      emails = state.emails.filter((email) => !action.data.has(email.id));
      return { ...state, deletedEmails, emails };
    case "archiveEmails":
      const archivedEmails = state.emails.filter((email) =>
        action.data.has(email.id)
      );
      emails = state.emails.filter((email) => !action.data.has(email.id));
      return { ...state, archivedEmails, emails };
    default:
      throw new Error();
  }
};

export default mailAppReducer;
