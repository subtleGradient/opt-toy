import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

import { TypeThing } from "./TypeThing";
import { useQueryDataKey } from "./ParsedQuery";
import { KnownTypes } from "./KnownTypes";

let UID = -1; // user as a unique key for each type
const getNextUID = () => ++UID;

function useStuff() {
  const [types, setTypes] = useQueryDataKey("type", ["Dx/Ox"]);
  const [typeIDs, setTypeIDs] = React.useState(() => types.map(getNextUID));
  const setOPTypeTextAtIndex = (index: number, opTypeText: string | null) => {
    if (opTypeText == null) {
      const newTypes = types.slice();
      newTypes.splice(index, 1);
      setTypes(newTypes);

      const newTypeIDs = typeIDs.slice();
      newTypeIDs.splice(index, 1);
      setTypeIDs(newTypeIDs);
      return;
    }
    const newTypes = types.slice();
    newTypes[index] = opTypeText;
    setTypes(newTypes);

    if (!(index in typeIDs)) {
      const newTypeIDs = typeIDs.slice();
      newTypeIDs[index] = getNextUID();
      setTypeIDs(newTypeIDs);
    }
  };
  return {
    setOPTypeTextAtIndex,
    typeIDs,
    types,
    addType(typeText) {
      setOPTypeTextAtIndex(types.length, typeText);
    },
  };
}

function App() {
  const { setOPTypeTextAtIndex, typeIDs, types, addType } = useStuff();
  const [showKnowns, setShowKnown] = useQueryDataKey("showKnown", []);
  const showKnown = showKnowns.length > 0;

  return (
    <div className="App">
      <div>
        <button
          onClick={e => {
            setOPTypeTextAtIndex(types.length, "Dx/Ox");
          }}
        >
          Add
        </button>
        <button
          onClick={e => {
            setOPTypeTextAtIndex(types.length - 1, null);
          }}
        >
          Remove
        </button>
        {" -- "}
        {showKnown || (
          <button
            onClick={() => {
              setShowKnown(["1"]);
            }}
          >
            Show known types list
          </button>
        )}
        {showKnown && (
          <button
            onClick={() => {
              setShowKnown([]);
            }}
          >
            Hide known types list
          </button>
        )}
      </div>
      {showKnown && <KnownTypes addType={addType} />}

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {types.map((type, index) => (
          <TypeThing
            key={typeIDs[index]}
            selected={types.length === 1}
            defaultType={type}
            onClose={() => {
              setOPTypeTextAtIndex(index, null);
            }}
            onChangeText={(opTypeText: any) => {
              setOPTypeTextAtIndex(index, opTypeText);
            }}
          />
        ))}
      </div>

      {types.length > 1 && (
        <blockquote>Click a graph to open details</blockquote>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
