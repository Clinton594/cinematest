import React from "react";
import Edit from "../Icons/Edit";

export default function ComponentEdit(row, index) {
  return (
    <span className="edit" title={`Edit ${row.title}`}>
      <img data-tag="allowRowEvents" src="img/icons/edit-svgrepo-com.svg" alt={row.title} />
    </span>
  );
}
