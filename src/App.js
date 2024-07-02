import React, { useState } from 'react';
import './App.css';
import logo from '../src/Components/Assets/Amity-Logo.webp'; // Import the logo image file

function App() {
  const [selectedLab, setSelectedLab] = useState('');
  const [pcStatus, setPcStatus] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
    setPcStatus({});
    setIsDropdownOpen(false);
  };

  const handlePcToggle = (pcId) => {
    setPcStatus((prevStatus) => ({
      ...prevStatus,
      [pcId]: !prevStatus[pcId],
    }));
  };

  const handleSave = () => {
    console.log('Selected Lab:', selectedLab);
    console.log('PC Status:', pcStatus);
  };

  const generatePCBoxes = () => {
    const pcBoxes = [];
    const numStudentPCs = 12;

    pcBoxes.push(
        <div
            key="projector"
            className={`pc projector ${pcStatus['projector'] ? 'active' : 'inactive'}`}
            onClick={() => handlePcToggle('projector')}
        >
          <label>Projector</label>
        </div>
    );

    pcBoxes.push(
        <div
            key="faculty-pc"
            className={`pc faculty-pc ${pcStatus['faculty-pc'] ? 'active' : 'inactive'}`}
            onClick={() => handlePcToggle('faculty-pc')}
        >
          <label>Faculty PC</label>
        </div>
    );

    for (let i = 1; i <= numStudentPCs * 3; i++) {
      const pcId = `student-pc-${i}`;
      pcBoxes.push(
          <div
              key={pcId}
              className={`pc ${pcStatus[pcId] ? 'active' : 'inactive'}`}
              onClick={() => handlePcToggle(pcId)}
          >
            <label>Student PC {i}</label>
          </div>
      );
    }

    return pcBoxes;
  };

  const labOptions = [
    { label: 'Lab 105', value: 'Lab 105' },
    { label: 'Lab 107', value: 'Lab 107' },
  ];

  return (
      <div className="App">
        <header className="App-header">
          <div className="header-container">
            {/* Add the logo */}
            <img src={logo} alt="Logo" className="logo" />
            <h1>Amity Central Lab Equipment Checklist</h1>
          </div>
          <div className="room-select" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <label>Select a Lab:</label>
            <div className="dropdown">
              <div className="selected-option-container">
                <span className="selected-option" onClick={() => setSelectedLab('')}>
                  {selectedLab || 'Select '}
                </span>
                <div className="arrow-down"></div>
                {/* Curved drop-down arrow */}
              </div>

              {isDropdownOpen && (
                  <div className="dropdown-content">
                    {labOptions.map((option) => (
                        <span
                            key={option.value}
                            className="option"
                            onClick={() => handleLabSelect(option.value)}
                        >
                          {option.label}
                        </span>
                    ))}
                  </div>
              )}
            </div>
          </div>
          {selectedLab && (
              <div className="pc-container">
                <h2>{selectedLab} PCs</h2>
                <div className="pc-checkboxes">{generatePCBoxes()}</div>
              </div>
          )}
          <button onClick={handleSave}>Save</button>
        </header>
      </div>
  );
}

export default App;

