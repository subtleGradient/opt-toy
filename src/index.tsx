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
  let [type0, setType0] = React.useState(type);

  return (
    <div className="App">
      <h1>Objective Personality OPT 9 Coin System exploration toy</h1>
      <div>
        <TypeThing storageID="optype1" />
        <TypeThing storageID="optype2" />
      </div>
      <small>{`
        WARNING (especially to ExxJs): I don't want your help with this. No hard
        feelings. This is a fun side project for my masculine Ti. Thanks.
        Validation welcome. Criticism not welcome.
      `}</small>
      <ul>
        <li>
          TODO: read/write values to URL so you can deep link to specific types
        </li>
        <li>TODO: Better mobile layout</li>
        <li>
          TODO: generate the OPT type number + ABCD variant from the editor data
        </li>
        <li>
          TODO: Render the type bubble graph from the editor data (in progress)
        </li>
        <li>TODO: Clicking Energy when A3 is null should not switch to Info</li>
        <li>
          TODO: One click Savior/Demon swap virtual coins. e.g. Tom Bilyeu and
          Will Smith
        </li>
        <li>TODO: celebrity list</li>
        <li>
          TODO: sort the coins so that the binary value of each type corresponds
          to the OPT128+A-D sorting. Ask that one guy from the OP FB group for
          the details about how he broke down their code again. What's his name?
          Check{" "}
          <a href="https://docs.google.com/spreadsheets/d/1B6d9splICaDGgdDmeCCpdh8RRZSA9rMo45LRQQEcZV8/edit#gid=0">
            the spreadsheet
          </a>{" "}
          for the test fixtures
        </li>
        <li>TODO: save / restore using localStorage?</li>
        <li>
          TODO: add something above the gray insights rows to make it obvious
          that they are NOT core coins
        </li>
        <li>TODO: </li>
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

const fetchSheetData = async () =>
  fetch("https://api.sheety.co/18a68d25-be81-4ce2-be81-5e410644e216");
