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
      <KnownTypes setTypes={setTypes} />

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {types.map(
          (type, index) =>
            type && (
              <TypeThing
                key={index}
                selected={types.length === 1}
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            onClick={e => {
              setOPTypeTextAtIndex(types.length, "Dx/Ox");
            }}
          >
            Add
          </button>
          <button
            onClick={e => {
              setTypes(types => types.slice(0, types.length - 1));
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {types.length > 1 && (
        <blockquote>Click a graph to open details</blockquote>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
