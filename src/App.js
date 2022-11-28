import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ShellBar } from "@ui5/webcomponents-react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";

function App() {
  return (
    <>
      <ShellBar title="Sales Order App"></ShellBar>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="detail" element={<Details/>}/>
      </Routes>
    </>
  );
}

export default App;
