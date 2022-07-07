import React from "react";

export default function Section(props) {
  return <section className={["py-5", props.className].join(" ")}>{props.children}</section>;
}
