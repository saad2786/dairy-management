import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const DairyContext = createContext(null);
const DairyDispatchContext = createContext(null);

export function DairyProvider({ children }) {
  const [dairyId, setDairyId] = useState(4);
  return (
    <DairyContext.Provider value={dairyId}>
      <DairyDispatchContext.Provider value={setDairyId}>
        {children}
      </DairyDispatchContext.Provider>
    </DairyContext.Provider>
  );
}

export function useDairyId() {
  return useContext(DairyContext);
}
export function useDairyIdDispatch() {
  return useContext(DairyDispatchContext);
}
