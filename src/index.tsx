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
  const [showRules, setShowRule] = useQueryDataKey("showRule", []);
  const showRule = showRules.length > 0;
  const [rules, setRules] = useQueryDataKey("rule", []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <span style={{ flex: 1 }} />
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
        <span style={{ flex: 1 }} />
        {(showKnown && (
          <button
            onClick={() => {
              setShowKnown([]);
            }}
          >
            Hide known types list
          </button>
        )) || (
          <button
            onClick={() => {
              setShowKnown(["1"]);
            }}
          >
            Show known types list
          </button>
        )}
        {(showRule && (
          <button
            onClick={() => {
              setShowRule([]);
            }}
          >
            Hide rules
          </button>
        )) || (
          <button
            onClick={() => {
              setShowRule(["1"]);
            }}
          >
            Show rules
          </button>
        )}
        <span style={{ flex: 1 }} />
      </div>
      {showKnown && <KnownTypes addType={addType} />}
      {showRule && <FollowTheRulesBro />}

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

function FollowTheRulesBro() {
  return (
    <div style={{ border: "4px dotted red" }}>
      <i>WARNING: Work in progress. Ignore this for now maybe.</i>
      <br />
      not not Tony Robbins
      <br />
      has Te = Te or Fi
      <br />
      high Te = Savior Te, masculine Te, double-activated Te
      <br />
      high Blast = Consume 4th, Blast 1st, MM Blast, M Play + M Sleep; TODO:
      Rank the intensity of maybe Blast of all types
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
