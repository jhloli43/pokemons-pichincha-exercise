import React from "react";
import { TableProps } from "./Table.interfaces";
import { tableStyles } from "./Table.styles";

export default function Table (props: TableProps) {
  const { columns, onClickDelete, onClickEdit, onClickImage, rows, style, ...rest } = props;

  const cellIconStyle: React.CSSProperties = { ...tableStyles.cell, textAlign: "center" }
  const cellActionsStyle: React.CSSProperties = { ...tableStyles.cell, textAlign: "center" }
  const trashIconStyle: React.CSSProperties = { ...tableStyles.icon, marginLeft: "10px" };

  return (
    <table style={style} {...rest}>
      <tr>
        {columns.map((column, index) => (
          <th key={`column-${index}`} style={tableStyles.cell}>{column}</th>
        ))}
      </tr>
      {rows.map((row, index) => (
        <tr key={`row-${index}`}>
          <td style={tableStyles.cell}>{row.name}</td>
          <td style={cellIconStyle}>
            <i
              className="fa-solid fa-image fa-lg fa-fw"
              style={{ cursor: "pointer" }}
              onClick={() => onClickImage(row.image)}
            />
          </td>
          <td style={tableStyles.cell}>{row.attack}</td>
          <td style={tableStyles.cell}>{row.defense}</td>
          <td style={cellActionsStyle}>
            <i
              className="fa-regular fa-pen-to-square fa-lg fa-fw"
              style={tableStyles.icon}
              onClick={() => onClickEdit(row)}
            />
            <i
              className="fa-regular fa-trash-can fa-lg fa-fw"
              style={trashIconStyle}
              onClick={() => onClickDelete(row.id!)}
            />
          </td>
        </tr>
      ))}
    </table>
  )
}