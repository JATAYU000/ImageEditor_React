import {MdArrowBack, MdArrowForward} from 'react-icons/md';


const Liveimage = ({file, handleRemove, handleChange, isImg, ImageStyle, isFirst, isLast, handlePrevious, handleNext, domEl}) => {
    return (
        <div>
            {isImg?(
                <div className="image-box">
                    <img  
                        alt="Not Loaded.."
                        width={"80%"}
                        className="Limage"
                        ref={domEl}
                        src={URL.createObjectURL(file.ul)}
                        style = {ImageStyle}
                        />
                        <div className="button-container">
                            <div><button
                            className="image-button"
                            onClick={handleRemove}
                            >Remove Image</button></div>
                            {isFirst?(
                                <div></div>
                            ):(
                                <div>
                                    <button
                                        className="prv-nxt"
                                        onClick={handlePrevious}
                                        ><MdArrowBack size='1.5em' 
                                    /></button>
                                </div>
                            )

                            }
                            {
                                isLast?(
                                    <div></div>
                                ):(
                                    <div>
                                        <button
                                            className="prv-nxt"
                                            onClick={handleNext}
                                            ><MdArrowForward size='1.5em' 
                                        /></button>
                                    </div>
                                )
                            }
                            
                        </div>
                </div>
            ):(
                <div className="no-image">
                    <h2>Add Image:</h2>
                    <input type="file" size="60" onChange={handleChange} />
                </div>
            )}    
        </div>
    );
};
export default Liveimage;