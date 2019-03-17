import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import { OPT512 } from "./OPT512";
import { OPT512Maybe, parseCoinText } from "./Coin";
import { TypeThing } from "./TypeThing";
// import useUndo from "use-undo";
// import { createBrowserHistory } from "history";
import createPersistedState from "use-persisted-state";
import { SetStateAction, Dispatch } from "react";
const useSavedItems = createPersistedState("OPT-TOY:saved");

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

interface ParsedQuery {
  [key: string]: string[];
}

function encodeAsQueryString(data: ParsedQuery): string {
  const params = [];
  for (const key in data) {
    if (!data.hasOwnProperty(key)) continue;
    if (!key) continue;
    const value = data[key];
    if (!value) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item == null) continue;
        params.push(
          `${encodeURIComponent(key) + "[]"}=${encodeURIComponent(item).replace(
            /%2F/g,
            "/",
          )}`,
        );
      }
    } else {
      params.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value).replace(
          /%2F/g,
          "/",
        )}`,
      );
    }
  }
  return `?${params.join("&")}`;
}

function parseQueryString(query: string): ParsedQuery {
  return query
    .split("#")
    .reverse()[0]
    .split("?")
    .reverse()[0]
    .split("&")
    .reduce((data, param) => {
      const [key, value]: string[] = param
        .split("=")
        .map(it => decodeURIComponent(it));
      const simpleKey = key.replace("[]", "");
      data[simpleKey] = [...(data[simpleKey] || []), value].filter(Boolean);
      return data;
    }, {});
}

function useLocationHash(window) {
  const [query, setQuery] = React.useState(() => window.location.hash);

  // React.useEffect(() => {
  //   if (!window) return;
  //   const handler = () => setQuery(window.location.hash);
  //   window.addEventListener("hashchange", handler);
  //   return () => window.removeEventListener("hashchange", handler);
  // }, [window]);

  React.useEffect(() => {
    window.location.hash = query;
  }, [query]);

  return [query, setQuery];
}

function useQueryData(): [ParsedQuery, Dispatch<SetStateAction<ParsedQuery>>] {
  const [query, setQuery] = useLocationHash(window);
  const [queryData, setQueryData] = React.useState(() =>
    parseQueryString(query),
  );
  const encodedQuery = encodeAsQueryString(queryData);
  React.useEffect(() => setQuery(encodedQuery), [encodedQuery]);
  return [queryData, setQueryData];
}

function useQueryDataKey(
  dataKey: string,
  defaultValues: string[] = [],
): [string[], Dispatch<SetStateAction<string[]>>] {
  const [queryData, setQueryData] = useQueryData();
  return [
    queryData[dataKey] || defaultValues,
    newValue => {
      setQueryData(state => ({
        ...state,
        [dataKey]:
          typeof newValue === "function"
            ? newValue(state[dataKey] || defaultValues)
            : newValue,
      }));
    },
  ];
}

// const useTypes: typeof React.useState = () => {
//   // const [instanceState, setInstanceState] = React.useState([]);
//   // const types = [
//   //   ...(Array.isArray(instanceState)
//   //     ? instanceState.filter(Boolean)
//   //     : [instanceState] || ["Dx/Ox"]),
//   // ];
//   // const setTypes = setter =>
//   //   setInstanceState({
//   //     ...instanceState,
//   //     type: setter(types),
//   //   });
//   return [types, setTypes];
// };

class OptToyItem {
  persist: boolean;
  bookmarked: boolean;
  label: string;
  opType: OPT512;
  constructor(opTypeText: string) {
    this.opType = new OPT512(parseCoinText(opTypeText));
  }
}

function useOptToyItems() {
  const [items, setItems] = React.useState([]);

  const [bookmarkedTypes, setBookmarkedTypes] = useQueryDataKey("type");
  React.useEffect(() => {
    bookmarkedTypes.map(opText => {
      const item = new OptToyItem(opText);
      item.bookmarked = true;
      return item;
    });
  }, []);

  const [savedItems, setSavedItems] = useSavedItems();
  return [items, () => {}];
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function App() {
  // const [optToyState, setOptToyState] = useOptToyGlobalState({});
  // const [bookmarkedTypes, setBookmarkedTypes] = useQueryDataKey("type");
  const [types, setTypes] = useQueryDataKey("type");
  const setOPTypeTextAtIndex = (index, opTypeText) => {
    console.log("setOPTypeTextAtIndex", index, opTypeText);
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
                onChangeText={opTypeText => {
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
