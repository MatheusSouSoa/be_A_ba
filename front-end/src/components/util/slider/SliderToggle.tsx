import React, { useState } from 'react'; // Certifique-se de importar o arquivo CSS correspondente

export default function SliderToggle() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="slider-container flex justify-center items-center">
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
        <span className="slider"></span>
      </label>
    </div>
  );
}
