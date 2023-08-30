import React, { FC, useEffect } from "react"
import { useState } from "react"
import { betweenRootStylesX, betweenX } from "./between"
import { KnownTypes, SelectedTypes } from "./KnownTypes"
import { useQueryDataKey } from "./ParsedQuery"
import { TypeThing, TypeThingProps } from "./TypeThing"
import { GlobalDefs } from "./OPBubbles4"
import { isSSR } from "../../util/constants"

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
    typeIDInsertBefore(tidBeingMoved: number, oldTID: number) {
      setTypeIDs((typeIDs) => {
        const newTypeIDs = typeIDs.slice(0)
        const oldIndex = typeIDs.indexOf(tidBeingMoved)
        const newIndex = typeIDs.indexOf(oldTID)
        newTypeIDs.splice(oldIndex, 1)
        newTypeIDs.splice(newIndex, 0, tidBeingMoved)
        return newTypeIDs
      })
    },
    types,
    addType(typeText: string) {
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
      <style jsx global>{`
        html,
        body {
          font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
        }
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

        .TypeThing-wrap {
          width: 100%;
        }

        @media (max-width: 424px) {
          .TypeThing-wrap {
            width: 100%;
          }
        }
        @media (min-width: 425px) {
          .TypeThing-wrap {
            width: 50%;
          }
        }
        @media (min-width: 768px) {
          .TypeThing-wrap {
            width: 25%;
          }
        }
        @media (min-width: 1441px) {
          .TypeThing-wrap {
            width: calc(100% / 6);
          }
        }
      `}</style>
      <GlobalDefs />
    </>
  )
}

const DragableTypeThing: FC<
  {
    tID: number
    onDropOnto: (a: number, b: number) => void
  } & TypeThingProps
> = ({ tID, onDropOnto: typeIDInsertBefore, ...props }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isDropping, setIsDropping] = useState(false)
  return (
    <div
      className="TypeThing-wrap"
      data-is-dragging={isDragging}
      data-is-dropping={isDropping}
      onDragOver={(e) => {
        setIsDropping(true)
        e.preventDefault()
      }}
      onDragEnter={() => {
        setIsDropping(true)
      }}
      onDragLeave={() => {
        setIsDropping(false)
      }}
      onDrop={(e) => {
        setIsDropping(false)
        const typeID = parseInt(
          e.dataTransfer.getData("application/opdex+typeID"),
          10,
        )
        typeIDInsertBefore(typeID, tID)
      }}
      draggable
      onDragStart={(e) => {
        setIsDragging(true)
        e.dataTransfer.setData("application/opdex+typeID", tID + "")
      }}
      onDragEnd={() => {
        setIsDragging(false)
      }}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style jsx>{`
        [data-is-dragging="true"] {
          opacity: 0.125;
          transform: scale(0.75);
        }
        [data-is-dropping] {
          box-sizing: border-box;
          border-left: 2px solid transparent;
        }
        [data-is-dropping="true"] {
          border-left-color: black;
        }
      `}</style>
      <TypeThing {...props} />
    </div>
  )
}

function useLocationHash() {
  const [renderId, setRenderId] = useState(-1)
  useEffect(() => {
    if (typeof window === "undefined") return
    const handleHashChange = () => setRenderId((n) => n + 1)
    window.addEventListener("hashchange", handleHashChange, false)
    return () =>
      window.removeEventListener("hashchange", handleHashChange, false)
  }, [])
  const { hash } = location
  return hash
}

const Settings: FC<{
  showOPTable: boolean
  setShowOPTable: (show: ["0" | "1"]) => unknown
}> = ({ showOPTable, setShowOPTable }) => {
  const hash = useLocationHash()
  return (
    <div className="settings">
      <style jsx>{`
        .settings {
          padding: 1rem;
          background: #ddd;
          display: flex;
        }
      `}</style>
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
      <Spacer />
      <div className="old">
        <a href={`https://opt-toy-h8kz9h0ex.vercel.app/${hash}`}>
          Open in previous version of opt-toy
        </a>
      </div>
    </div>
  )
}

export default function OptToyApp() {
  const { setOPTypeTextAtIndex, typeIDs, typeIDInsertBefore, types, addType } =
    useStuff()
  const [showKnowns, setShowKnown] = useQueryDataKey("showKnown", ["1"])
  const showKnown = showKnowns.length > 0
  const [showSettings, setShowSettings] = useState(false)
  const [[showOPTableQueryValue], setShowOPTable] = useQueryDataKey(
    "showOPTable",
    [],
  )
  const showOPTable = showOPTableQueryValue === "1"

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null

  return (
    <SelectedTypes.Provider value={types}>
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
          <button
            onClick={() => void setOPTypeTextAtIndex(types.length, "Dx/Ox")}
          >
            ➕ Add
          </button>
          <button
            onClick={() => void setOPTypeTextAtIndex(types.length - 1, null)}
          >
            🗑️ Remove
          </button>
          <Spacer />
          <button onClick={() => void setShowKnown(showKnown ? [] : ["1"])}>
            {showKnown ? "▼" : "▶"}
            types
          </button>
          <button onClick={() => void setShowSettings((show) => !show)}>
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

        <div className="settings">
          {showSettings && (
            <Settings
              setShowOPTable={setShowOPTable}
              showOPTable={showOPTable}
            ></Settings>
          )}
        </div>

        <div className="KnownTypes-wrapper">
          {showKnown && <KnownTypes addType={addType} />}
        </div>

        {!isSSR && (
          <div
            className="all-the-TypeThings"
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {types.map((defaultType, index) => (
              <DragableTypeThing
                key={typeIDs[index]}
                tID={typeIDs[index]}
                onDropOnto={typeIDInsertBefore}
                {...{
                  onClose: () => void setOPTypeTextAtIndex(index, null),
                  onChangeText: (opTypeText: any) =>
                    void setOPTypeTextAtIndex(index, opTypeText),
                  selected: types.length === 1,
                  defaultType,
                  showOPTable,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </SelectedTypes.Provider>
  )
}

function Spacer() {
  return <span style={{ flex: 1 }} />
}
