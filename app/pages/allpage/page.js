"use client";

import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer";
import FormBuilder from "../../components/FormBuilder";
import NavbarBuilder from "../../components/NavbarBuilder";
import Dashboard from "../../components/Dashboard";
import Help from "../../components/Help";
  


const AllPage = () => {

    const [activeTab, setActiveTab] = useState("builder");
  
    const tabs = [
      { id: "builder", label: "Form Builder" },
      { id: "navbar", label: "Navbar Builder" },
      { id: "dashboard", label: "Dashboard" },
      { id: "help", label: "Help" },
      { id: "logOut", label: "LogOut" },
      
    ];  
  
    const renderTabContent = () => {
      switch (activeTab) {
        case "builder":
          return <FormBuilder />;
        case "navbar":
          return <NavbarBuilder />;
        case "dashboard":
          return <Dashboard />;
        case "help":
          return <Help />;
        default:
          return <FormBuilder />;
      }
    };

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {/* <main className="main-content">{renderTabContent()}</main> */}
      <Footer />
    </div>
  )
}

export default AllPage
