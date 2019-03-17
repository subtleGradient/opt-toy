import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import { OPT512 } from "./OPT512";
import { OPT512Maybe } from "./Coin";
import { TypeThing } from "./TypeThing";
import { useQueryDataKey } from "./ParsedQuery";
// import useUndo from "use-undo";

// import { createBrowserHistory } from "history";
// import createPersistedState from "use-persisted-state";
// const useSavedItems = createPersistedState("OPT-TOY:saved");

interface KnownType {
  index: number;
  "oPT#": number;
  "oPT#+": string;
  "m/F": string;
  saviors: string;
  animals: string;
  typeCode: string;
  doublyActivatedFunctions: string;
  people1: string | null;
  people2: string | null;
  people3: string | null;
  people4: string | null;
  people5: string | null;
  people6: string | null;
  people7: string | null;
  people8: string | null;
  people9: string | null;
  people10: string | null;
  people11: string | null;
  people12: string | null;
  people13: string | null;
  people14: string | null;
}
const KNOWN_TYPES: KnownType[] = require("./known-types.sheet.json");

export function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type);
  return <span>{opt.OP512}</span>;
}

function App() {
  const [types, setTypes] = useQueryDataKey("type", ["Dx/Ox"]);
  const setOPTypeTextAtIndex = (index: number, opTypeText: string | null) => {
    const newTypes = types.slice();
    newTypes[index] = opTypeText;
    setTypes(newTypes);
  };

  let [showKnown, setShowKnown] = React.useState(false);

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {types.map(
          (type, index) =>
            type && (
              <TypeThing
                key={index}
                selected={index === 0}
                defaultType={type}
                onClose={() => {
                  setOPTypeTextAtIndex(index, null);
                }}
                onChangeText={(opTypeText: any) => {
                  setOPTypeTextAtIndex(index, opTypeText);
                }}
              />
            ),
        )}
        <button
          onClick={e => {
            setOPTypeTextAtIndex(types.length, "Dx/Ox");
          }}
        >
          Add
        </button>
      </div>
      <hr />
      <div>
        <h2>
          Known Types{" "}
          {showKnown || (
            <button
              onClick={() => {
                setShowKnown(true);
              }}
            >
              Show known types list
            </button>
          )}
          {showKnown && (
            <button
              onClick={() => {
                setShowKnown(false);
              }}
            >
              Hide known types list
            </button>
          )}
        </h2>
        {showKnown &&
          KNOWN_TYPES.map((kType, index) => {
            const kTypePrev = KNOWN_TYPES[index - 1] || { ...kType };
            return (
              <React.Fragment key={kType.index}>
                {kType["m/F"] !== kTypePrev["m/F"] && <br />}
                {kType.saviors !== kTypePrev.saviors && <br />}
                <a
                  href={`#?type[]=${encodeURIComponent(kType.typeCode)}`}
                  onClick={e => {
                    e.preventDefault();
                    setTypes(types => [...types, kType.typeCode]);
                  }}
                >
                  {kType.typeCode}
                </a>{" "}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

const fetchSheetData = async () =>
  await fetch("https://api.sheety.co/18a68d25-be81-4ce2-be81-5e410644e216");
