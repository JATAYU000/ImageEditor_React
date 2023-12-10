import React from "react";



const Values = ({name, active, handleClickButton}) => {


    return (
        <div className="values-container">
            <button 
                className={`values-button ${active? 'active' : ''}`}
                onClick={handleClickButton}
            >{name}</button>

        </div>
    );
};
export default Values;