import React from "react";
const Editor = ({min, max, value, handleChangeSlider, handleSave, isImg}) => {
    return (
        <div className="Editor-slider">
            <input 
                type='range' 
                className="slider"
                min = {min}
                max = {max}
                value = {value}
                onChange = {handleChangeSlider} />
            {isImg?(
                <button 
                className="Editor-save"
                onClick={handleSave}>Save Image</button>
            ):(
                <div></div>
            )}
            
        </div>
    );
};
export default Editor;