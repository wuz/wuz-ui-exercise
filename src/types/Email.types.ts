export type EmailId = string;

export type Email = {
  id: EmailId;
  subject: string;
  sender: string;
  body: string;
  tags: string[];
  date: Date;
};
