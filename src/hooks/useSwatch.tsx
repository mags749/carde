import React, { createContext, useState, useContext, ReactNode } from "react";
import { Swatch } from "../utils/types";

interface SwatchContextType {
  swatch: Swatch;
  toggleSwatch: (flag: boolean) => void;
}

const SwatchContext = createContext<SwatchContextType | undefined>(undefined);

interface SwatchProviderProps {
  children: ReactNode;
}

const SwatchProvider: React.FC<SwatchProviderProps> = ({ children }) => {
  const [swatch, setSwatch] = useState<Swatch>("light");

  const toggleSwatch = (flag: boolean) => setSwatch(flag ? "dark" : "light");

  return (
    <SwatchContext.Provider value={{ swatch, toggleSwatch }}>
      {children}
    </SwatchContext.Provider>
  );
};

const useSwatch = (): SwatchContextType => {
  const context = useContext(SwatchContext);
  if (context === undefined) {
    throw new Error("useSwatch must be used within a SwatchProvider");
  }
  return context;
};

export default useSwatch;

export { SwatchProvider, SwatchContextType };
