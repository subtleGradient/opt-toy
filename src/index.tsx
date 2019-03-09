import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import { OPT512 } from "./OPT512";
import { OPT512Maybe, BLANK_TYPE } from "./Coin";
import { TypeThing } from "./TypeThing";

export function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type);
  return <span>{opt.OP512}</span>;
}

function App() {
  let [type, setType] = React.useState(
    () => BLANK_TYPE.slice(0) as OPT512Maybe
  );
  let [count, setCount] = React.useState(2);

  return (
    <div className="App">
      <h1>Objective Personality OPT 9 Coin System exploration toy</h1>
      <button onClick={e => setCount(count + 1)}>More!</button>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {Array(count)
          .join()
          .split(",")
          .map((_, index) => (
            <TypeThing key={index} storageID={"optype" + index} />
          ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

const fetchSheetData = async () =>
  fetch("https://api.sheety.co/18a68d25-be81-4ce2-be81-5e410644e216");
