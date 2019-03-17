import * as React from "react";

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

export function KnownTypes({ setTypes }) {
  let [showKnown, setShowKnown] = React.useState(false);
  return (
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
                  setTypes((types: string[]) => [...types, kType.typeCode]);
                }}
              >
                {kType.typeCode}
              </a>{" "}
            </React.Fragment>
          );
        })}
    </div>
  );
}
