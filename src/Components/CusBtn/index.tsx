/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./cusBtn.css";

const CusBtn = ({ ...rest }) => {
  return <button {...rest}>Login</button>;
};

export default CusBtn;
