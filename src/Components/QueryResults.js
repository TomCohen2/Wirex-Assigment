import React from "react";

function QueryResults(props) {
  const columnsTitles = Object.keys(props.result[0]);
  const DisplayData = props.result.map((info, index) => {
    return (
      <tr key={index}>
        {columnsTitles.map((title, index) => {
          return (
            <td
              key={index}
              style={{
                border: "1px solid black",
              }}
            >
              {info[title]}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "1rem",
        maxWidth: "100%",
      }}
    >
      <table
        className="table table-striped"
        style={{
          backgroundColor: "#f8f8f8",
        }}
      >
        <thead
          style={{
            backgroundColor: "rgb(0,0,0,0.1)",
          }}
        >
          <tr>
            {columnsTitles.map((title, index) => {
              return (
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid black",
                  }}
                  key={index}
                >
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}

export default QueryResults;
