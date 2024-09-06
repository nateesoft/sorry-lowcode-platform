import React, { createContext, useState } from "react"

const AppContext = createContext(null)

const AppProvider = ({ children }) => {
  const [selectId, setSelectId] = useState("")
  // console.log('AppProvider')
  return (
    <AppContext.Provider value={{ selectId, setSelectId }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
