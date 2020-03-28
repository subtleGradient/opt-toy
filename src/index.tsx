import * as React from "react"
import { useState } from "react"
import { render } from "react-dom"
import { KnownTypes } from "./KnownTypes"
import { useQueryDataKey } from "./ParsedQuery"
import "./styles.css"
import { TypeThing } from "./TypeThing"
import { betweenX, betweenRootStylesX } from "./between"

let UID = -1 // user as a unique key for each type
const getNextUID = () => ++UID

function useStuff() {
  const [types, setTypes] = useQueryDataKey("type", ["Dx/Ox"])
  const [typeIDs, setTypeIDs] = useState(() => types.map(getNextUID))
  const setOPTypeTextAtIndex = (index: number, opTypeText: string | null) => {
    if (opTypeText == null) {
      const newTypes = types.slice()
      newTypes.splice(index, 1)
      setTypes(newTypes)

      const newTypeIDs = typeIDs.slice()
      newTypeIDs.splice(index, 1)
      setTypeIDs(newTypeIDs)
      return
    }
    const newTypes = types.slice()
    newTypes[index] = opTypeText
    setTypes(newTypes)

    if (!(index in typeIDs)) {
      const newTypeIDs = typeIDs.slice()
      newTypeIDs[index] = getNextUID()
      setTypeIDs(newTypeIDs)
    }
  }
  return {
    setOPTypeTextAtIndex,
    typeIDs,
    types,
    addType(typeText) {
      setOPTypeTextAtIndex(types.length, typeText)
    },
  }
}

function RootStyle() {
  return (
    <>
      <style>{`
        ${betweenRootStylesX({ selector: "html", min: 320, max: 424 })}
        ${betweenRootStylesX({ selector: "html", min: 425, max: 767 })}
        ${betweenRootStylesX({ selector: "html", min: 768, max: 1440 })}
        ${betweenRootStylesX({ selector: "html", min: 1441, max: 2560 })}
      `}</style>
      <style>{`
        @media screen and (max-width: 424px) {
          html {
            font-size: ${betweenX(14, 18, 320, 424)};
          }
        }
        @media screen and (min-width: 425px) {
          html {
            font-size: ${betweenX(9, 16, 425, 767)};
          }
        }
        @media screen and (min-width: 768px) {
          html {
            font-size: ${betweenX(8, 16, 768, 1440)};
          }
        }
        @media screen and (min-width: 1441px) {
          html {
            font-size: ${betweenX(9, 16, 1441, 2560)};
          }
        }
      `}</style>
    </>
  )
}

function App() {
  const { setOPTypeTextAtIndex, typeIDs, types, addType } = useStuff()
  const [showKnowns, setShowKnown] = useQueryDataKey("showKnown", [])
  const showKnown = showKnowns.length > 0
  const [showSettings, setShowSettings] = useState(false)
  const [[showOPTableQueryValue], setShowOPTable] = useQueryDataKey(
    "showOPTable",
    [],
  )
  const showOPTable = showOPTableQueryValue === "1"

  return (
    <div className="App">
      <RootStyle />
      <div
        className="bar"
        style={{
          display: "flex",
          background: "#eee",
          padding: 3,
          // position: "fixed",
          // top: 0,
          // left: 0,
          // width: "100%",
        }}
      >
        <button onClick={e => void setOPTypeTextAtIndex(types.length, "Dx/Ox")}>
          ➕ Add
        </button>
        <button
          onClick={e => void setOPTypeTextAtIndex(types.length - 1, null)}
        >
          🗑️ Remove
        </button>
        <Spacer />
        <button onClick={() => void setShowKnown(showKnown ? [] : ["1"])}>
          {showKnown ? "▼" : "▶"}
          types
        </button>
        <button onClick={() => void setShowSettings(show => !show)}>
          {showSettings ? "▼" : "▶"}
          settings
        </button>
        <Spacer />
        <span>
          <a href="https://OPDEX.app" style={{ whiteSpace: "nowrap" }}>
            OP<b>DEX</b>
            <small>.app</small>
          </a>
        </span>
      </div>

      {showSettings && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={showOPTable}
              onChange={({ target: { checked } }) =>
                void setShowOPTable(!checked ? ["0"] : ["1"])
              }
            />
            show OP table?
          </label>
        </div>
      )}
      {showKnown && <KnownTypes addType={addType} />}

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {types.map((type, index) => (
          <TypeThing
            key={typeIDs[index]}
            selected={types.length === 1}
            defaultType={type}
            onClose={() => void setOPTypeTextAtIndex(index, null)}
            onChangeText={(opTypeText: any) =>
              void setOPTypeTextAtIndex(index, opTypeText)
            }
            showOPTable={showOPTable}
          />
        ))}
      </div>

      {types.length > 1 && (
        <blockquote>Click a graph to open details</blockquote>
      )}
    </div>
  )
}

function Spacer() {
  return <span style={{ flex: 1 }} />
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
