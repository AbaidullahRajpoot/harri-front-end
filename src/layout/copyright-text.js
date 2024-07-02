import Link from "next/link";
import React from "react";

const CopyrightText = () => {
  return (
    <>
      <span style={{color:"#fff"}}>
        Copyright © {new Date().getFullYear()} by Zoel IT All rights reserved
      </span>
      <br></br>
      <span  style={{color:"#fff"}} >
        Company Registration Number: 15458184
      </span>
    </>
  );
};

export default CopyrightText;
