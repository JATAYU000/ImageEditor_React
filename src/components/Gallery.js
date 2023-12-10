
const Gallery = ({media,handleGallerychange}) => {
    const ImageStyle=(opt)=> {
        const filters = opt.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return {filter: filters.join(' ')}
    }
 

    return (
        <div className="gal-container">
            
            <div>

            </div>
            <div className="gal-search">
            </div>
            <div className="gal-display">
                
                {media.map((image)=>{
                    return (
                        <div onClick={() => {handleGallerychange(image)}}>
                            <img  
                                alt="Not Loaded.."
                                style={ImageStyle(image.opt)}
                                src={URL.createObjectURL(image.ul)}
                                />
                        </div>
                    );
                    
                })}
            </div>
            
        </div>

    );
};

export default Gallery;