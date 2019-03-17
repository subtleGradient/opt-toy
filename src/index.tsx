import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import { OPT512 } from "./OPT512";
import { OPT512Maybe } from "./Coin";
import { TypeThing } from "./TypeThing";
// import useUndo from "use-undo";
// import { createBrowserHistory } from "history";

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
  [key: string]: string | string[];
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
      if (key.endsWith("[]")) {
        const simpleKey = key.replace("[]", "");
        data[simpleKey] = [...(data[simpleKey] || []), value].filter(Boolean);
      } else {
        data[key] = value;
      }
      return data;
    }, {});
}

const STORAGE_ID = "OPT-TOY";

function useLocationHash(window) {
  const [query, setQuery] = React.useState(
    () => window.location.hash || localStorage.getItem(STORAGE_ID),
  );

  React.useEffect(() => {
    if (!window) return;
    const handler = () => setQuery(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [window]);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_ID, query);
  }, [query]);

  return [
    query,
    query => {
      console.log("set hash", query);
      window.location.hash = query;
    },
  ];
}

function useQueryData(): [ParsedQuery, (data: ParsedQuery) => void] {
  const [query, setQuery] = useLocationHash(window);
  const [queryData, setQueryData] = React.useState(() =>
    parseQueryString(query),
  );
  React.useEffect(() => setQueryData(parseQueryString(query)), [query]);
  const encodedQuery = encodeAsQueryString(queryData);
  React.useEffect(() => setQuery(encodedQuery), [encodedQuery]);

  return [queryData, setQueryData];
}

function App() {
  const [queryData, setQueryData] = useQueryData();
  const types = [
    ...(Array.isArray(queryData.type)
      ? queryData.type.filter(Boolean)
      : [queryData.type] || ["Dx/Ox"]),
  ];
  const setTypes = setter =>
    setQueryData({
      ...queryData,
      type: setter(types),
    });
  const setOPTypeTextAtIndex = (index, opTypeText) => {
    setTypes(types => {
      types[index] = opTypeText;
      return types;
    });
  };
  // const [opTypes, opTypesActions] = useUndo(queryData);

  let [showKnown, setShowKnown] = React.useState(false);

  return (
    <div className="App">
      {/* <pre>{JSON.stringify(queryData, null, 2)}</pre> */}
      {/* <button
        onClick={e => {
          e.preventDefault();
          setCount(count - 1);
        }}
        disabled={count === 1}
      >
        Less!
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          setCount(count + 1);
        }}
        disabled={count >= 8}
      >
        More!
      </button> */}
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {types.map((type, index) => (
          <TypeThing
            key={index}
            selected={index === 0}
            defaultType={type}
            onClose={() => {
              setTypes(types => types.filter((_, iii) => iii !== index));
            }}
            onChangeText={opTypeText => {
              setOPTypeTextAtIndex(index, opTypeText);
            }}
          />
        ))}
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
              <React.Fragment>
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
