import React, { createContext, useContext, useState } from "react";

interface GlobalContextProps {
  selectedUserId: string | undefined;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  selectedUserId: undefined,
  setSelectedUserId: () => {},
});

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    undefined
  );

  return (
    <GlobalContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
