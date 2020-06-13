import React from "react";
import "./App.css";
import { Customers } from "./components/customers";
import { CustomersForm } from "./components/customerForm";
import {UploadDoc} from "./components/uploadDoc";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>CUSTOMERS</h2>
      </header>
      <CustomersForm></CustomersForm>
		  {/*<UploadDoc></UploadDoc>*/}
      <Customers />
    </div>
  );
}

export default App;
