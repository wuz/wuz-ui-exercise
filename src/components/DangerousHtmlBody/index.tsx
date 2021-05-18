import React from "react";

type Props = {
  inline?: boolean;
  children: string;
};

const DangerousHtmlBody = ({ inline = false, children }: Props) => {
  const Element = inline ? "span" : "div";
  return <Element dangerouslySetInnerHTML={{ __html: children }} />;
};

export default DangerousHtmlBody;
