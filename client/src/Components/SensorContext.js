import React, { createContext, useContext, useState } from "react";

const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [sensors, setSensors] = useState([]); 

  return (
    <SensorContext.Provider value={{ sensors, setSensors }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorContext = () => SensorProvider();
