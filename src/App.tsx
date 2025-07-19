import React from "react";
import "./App.css";
import SchemaBuilder from "./components/SchemaBuilder";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>JSON Schema Builder</h1>
      <SchemaBuilder />
    </div>
  );
};

export default App;



