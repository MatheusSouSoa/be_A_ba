import React, { useState } from 'react';

interface SliderToggleProps {
  isChecked: boolean;
  onChange: (newStatus: boolean) => void;
}

export default function SliderToggle({ isChecked, onChange }: SliderToggleProps) {
  const toggleSwitch = () => {
    onChange(!isChecked);
  };

  return (
    <div className={`slider-container flex justify-center items-center ${isChecked ? 'active' : ''}`}>
      <label className={`switch ${isChecked ? 'active' : ''}`}>
        <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
        <span className="slider"></span>
      </label>
    </div>
  );
}
