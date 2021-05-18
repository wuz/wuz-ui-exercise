import React from "react";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import classNames from "classnames";

import "./Checkbox.scss";

interface CheckboxProps {
  checked: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onClick }: CheckboxProps) => {
  return (
    <label className={classNames("c-Checkbox", { checked })}>
      {!checked && <CheckBoxOutlineBlankIcon />}
      {checked && <CheckBoxIcon />}
      <input type="checkbox" checked={checked} onChange={onClick} />
    </label>
  );
};

export default Checkbox;
