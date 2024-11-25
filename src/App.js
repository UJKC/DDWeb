import React, { useState } from "react";
import { saveAs } from "file-saver";

function App() {
  // Define state variables
  const [language, setLanguage] = useState("Java");
  const [clusterManagement, setClusterManagement] = useState("Zookeeper");
  const [tickTime, setTickTime] = useState("");
  const [initLimit, setInitLimit] = useState("");
  const [syncLimit, setSyncLimit] = useState("");
  const [clientPort, setClientPort] = useState("");
  const [os, setOs] = useState("Windows"); // New state for OS selection
  const [project, setProject] = useState("Empty_Zookeeper");

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate required fields
    if (!tickTime || !initLimit || !syncLimit || !clientPort || !os || !project) {
      alert("All fields under Zookeeper must be filled out.");
      return;
    }

    // Create the XML structure
    const formData = {
      language,
      clusterManagement,
      tickTime,
      initLimit,
      syncLimit,
      clientPort,
      os,
      project // Add OS to the form data
    };

    const xmlString = generateXML(formData);
    
    // Save XML file
    const blob = new Blob([xmlString], { type: "application/xml" });
    saveAs(blob, "formData.xml");
  };

  // Function to generate XML from form data
  const generateXML = (formData) => {
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlString += '<form>\n';

    // Add language
    xmlString += `  <language>${formData.language}</language>\n`;
    
    // Add cluster management
    xmlString += `  <clusterManagement>${formData.clusterManagement}</clusterManagement>\n`;

    // Add Zookeeper-related fields if applicable
    if (formData.clusterManagement === "Zookeeper") {
      xmlString += `  <tickTime>${formData.tickTime}</tickTime>\n`;
      xmlString += `  <initLimit>${formData.initLimit}</initLimit>\n`;
      xmlString += `  <syncLimit>${formData.syncLimit}</syncLimit>\n`;
      xmlString += `  <clientPort>${formData.clientPort}</clientPort>\n`;
      xmlString += `  <os>${formData.os}</os>\n`;
      xmlString += `  <project>${formData.project}</project>\n`;
    }

    xmlString += '</form>';

    return xmlString;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Language Selection */}
        <div>
          <label>Language (Required)</label>
          <div>
            <label>
              <input
                type="radio"
                name="language"
                value="Java"
                checked={language === "Java"}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
              Java
            </label>
          </div>
        </div>

        {/* Cluster Management Selection */}
        <div>
          <label>Cluster Management (Required)</label>
          <div>
            <label>
              <input
                type="radio"
                name="clusterManagement"
                value="Zookeeper"
                checked={clusterManagement === "Zookeeper"}
                onChange={(e) => setClusterManagement(e.target.value)}
                required
              />
              Zookeeper
            </label>
          </div>
        </div>

        {/* Conditional Fields for Zookeeper */}
        {clusterManagement === "Zookeeper" && (
          <div>
            <div>
              <label>tickTime (Required)</label>
              <input
                type="number"
                value={tickTime}
                onChange={(e) => setTickTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label>initLimit (Required)</label>
              <input
                type="number"
                value={initLimit}
                onChange={(e) => setInitLimit(e.target.value)}
                required
              />
            </div>

            <div>
              <label>syncLimit (Required)</label>
              <input
                type="number"
                value={syncLimit}
                onChange={(e) => setSyncLimit(e.target.value)}
                required
              />
            </div>

            <div>
              <label>clientPort (Required)</label>
              <input
                type="number"
                value={clientPort}
                onChange={(e) => setClientPort(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* OS Selection */}
        <div>
          <label>Operating System (Required)</label>
          <div>
            <label>
              <input
                type="radio"
                name="os"
                value="Windows"
                checked={os === "Windows"}
                onChange={(e) => setOs(e.target.value)}
                required
              />
              Windows
            </label>
            <label>
              <input
                type="radio"
                name="os"
                value="Linux"
                checked={os === "Linux"}
                onChange={(e) => setOs(e.target.value)}
                required
              />
              Linux
            </label>
          </div>
        </div>

        {/* Project Selection */}
        <div>
          <label>Project (Required)</label>
          <div>
            <label>
              <input
                type="radio"
                name="project"
                value="Empty_Zookeeper"
                checked={project === "Empty_Zookeeper"}
                onChange={(e) => setProject(e.target.value)}
                required
              />
              Empty Zookeeper
            </label>
            <label>
              <input
                type="radio"
                name="project"
                value="Empty_Java_Zookeeper"
                checked={project === "Empty_Java_Zookeeper"}
                onChange={(e) => setProject(e.target.value)}
                required
              />
              Empty Java Zookeeper
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
