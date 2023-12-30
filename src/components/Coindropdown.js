import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const CustomDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'option1', rank: '#1', label: 'ORDI', cap: '199900', percentage: '+5%', sats: 'sats/ordi' },
        { value: 'option2', rank: '#2', label: 'MEME', cap: '199900', percentage: '-2%', sats: 'sats/meme' },
        { value: 'option3', rank: '#3', label: 'PUNK', cap: '199900', percentage: '+8%', sats: 'sats/punk' },
        // Add more options as needed
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);

        // Reset selected option when closing the dropdown
        if (!isDropdownOpen) {
            setSelectedOption(null);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        toggleDropdown();
    };

    return (
        <div className="custom-dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                <div className="arrow-icon">
                    {!selectedOption ? (isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />) : null}
                </div>
                {selectedOption ? (
                    <div className="selected-option">
                        <div className="slabel">{selectedOption.label}</div>
                    </div>
                ) : (
                    <div className="placeholder"></div>
                )}
            </div>

            {isDropdownOpen && (
                <div className="dropdown-panel">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            <div className="rank">{option.rank}</div>
                            <div className="label">{option.label}</div>
                            <div className="grpDetails">
                                <div className="cap">{option.cap}</div>
                                <div className="sats">{option.sats}</div>
                                <div className="percentage">{option.percentage}</div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;






