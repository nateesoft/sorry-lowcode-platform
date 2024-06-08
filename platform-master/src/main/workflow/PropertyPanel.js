import React, { memo, useEffect, useState } from "react"

const PropertyPanel = memo(
  ({ props, onComponentChange, onShowPage, display }) => {
    const [label, setLabel] = useState("")

    const handleKeyUp = (evt) => {
      if (evt.keyCode === 13) {
        onComponentChange({
          id: props.id,
          label: label,
          component: props.component
        })
      }
    }

    useEffect(() => {
      if (props.label) {
        setLabel(props.label)
      } else {
        setLabel("")
      }
    }, [props])

    if (!props.id) {
      return <></>
    }

    function handlePage(page) {
      onShowPage({ show: true, page: page })
      display({})
    }

    return (
      <div className="ppanel">
        <span>Property</span>
        {props && (
          <div className="property">
            <div>Detail</div>
            <div>id: {props.id}</div>
            <div>
              label:{" "}
              <input
                type="text"
                value={label}
                onChange={(data) => setLabel(data.target.value)}
                onKeyUp={handleKeyUp}
              />
            </div>
            <div>type: {props.type}</div>
            {props.type === "page" && (
              <div>
                <button onClick={() => handlePage("grapsejs")}>
                  Preview Page (grapsejs)
                </button>
                <button onClick={() => handlePage("jsonform")}>
                  Preview Page (jsonform)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

export default PropertyPanel
