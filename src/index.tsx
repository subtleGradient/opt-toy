import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

import { TypeThing } from "./TypeThing";
import { useQueryDataKey } from "./ParsedQuery";
import { KnownTypes } from "./KnownTypes";

function App() {
  const [types, setTypes] = useQueryDataKey("type", ["Dx/Ox"]);
  const setOPTypeTextAtIndex = (index: number, opTypeText: string | null) => {
    const newTypes = types.slice();
    newTypes[index] = opTypeText;
    setTypes(newTypes);
  };

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
      <KnownTypes setTypes={setTypes} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

const fetchSheetData = async () =>
  await fetch("https://api.sheety.co/18a68d25-be81-4ce2-be81-5e410644e216");
