import React, { useState, useEffect, useRef } from "react";
import * as htmlToImage from 'html-to-image';
import Gallery from "./Gallery";
import Liveimage from "./Liveimage";
import Search from "./Search";
import Values from "./Values";
import Editor from "./Editor";

const OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Invert',
        property: 'invert',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: 'px'
    }
]

function HomePage() {

    const [file, setFile] = useState();
    const [isImg, setisImg] = useState();
    const [isFirst, setIsFirst] = useState();
    const [isLast, setIsLast] = useState();
    const [media, setMedia] = useState([]);
    const [options, setOptions] = useState(OPTIONS);
    const [selectedOptionIndex, setSelectedOpteionIndex] = useState(0);
    const selectedOption = options[selectedOptionIndex]

    useEffect(()=>{
        setisImg(false)
        setIsFirst(true)
        setIsLast(true)
    },[])
    const domEl = useRef(null);
    const downloadImage = async () => {
        handleSave();
        const dataUrl = await htmlToImage.toPng(domEl.current);

        const link = document.createElement('a');
        link.download = 'html-to-img.png';
        link.href = dataUrl;
        link.click();
    };

    const [searchText,setSearchText] = useState('');
    const index =(newImg, a)=>{
       
        let maxValue = 0;
        const values = Object.values(media);
        values.map((el) => {
            const valueFromObject = el.ind;
            maxValue = Math.max(maxValue, valueFromObject);
            });
        
        const ind = newImg.ind;
        if(ind===1){
            setIsFirst(true)
        }
        else{
            setIsFirst(false)
        }
        if(ind===maxValue+a){
            setIsLast(true)
        }
        else{
            setIsLast(false)
        }
        // return maxValue;
    }

    function handleChange(e) {
        let maxValue = 0;
        const values = Object.values(media);
        values.map((el) => {
            const valueFromObject = el.ind;
            maxValue = Math.max(maxValue, valueFromObject);
            });
        const newImg = {"ul" : e.target.files[0],"opt":options, 'ind':maxValue+1};
        setMedia([...media, newImg]);
        setFile(newImg);

        index(newImg,1);
        
        console.log(media);
        setisImg(true);
    }

    const handleRemove = () => {
        setisImg(false)
        setOptions(OPTIONS)
    }

    const handleGallerychange = (newfile) => {
        setOptions(newfile.opt)
        setFile(newfile)
        index(newfile,0)
        setisImg(true)
    }

    const handleChangeEditor = (event) => {
        setOptions(prevOptions => {
            return prevOptions.map((option, index)=>{
                if (index !== selectedOptionIndex) return option
                return {...option, value: event.target.value}
            })
        })
    }

    const getImageStyle=()=> {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return {filter: filters.join(' ')}
    }

    const handleSave=()=>{
        let maxValue = 0;
        const values = Object.values(media);
        values.map((el) => {
            const valueFromObject = el.ind;
            maxValue = Math.max(maxValue, valueFromObject);
            });
        const newImg = {"ul" : file.ul,"opt":options,"ind":maxValue+1};
        
        setMedia([...media, newImg]);
        
        setFile(newImg)
        index(newImg,1);

    
    }

    const handlePrevious= () =>{
        const values = Object.values(media);
        values.map((el) => {
            if(file.ind-1===el.ind){
                setFile(el);
                setOptions(el.opt);
                index(el,0);
            }
        });
        
    }
    
    const handleNext= () =>{
        const values = Object.values(media);
        values.map((el) => {
            if(file.ind+1===el.ind){
                setFile(el);
                setOptions(el.opt);
                index(el,0);
            }
        });
    }


    return (
        <div className="Main">


            <div className="gallery">
                <div className="gal-appName">
                    <p>PICS   FORGE</p>
                </div>
                <Search handleSearchImage= {setSearchText} />
                <Gallery
                    media={media.filter((img)=>
                        String(img.ul.name).includes(searchText)
                      )} 
                    handleGallerychange={handleGallerychange}
                />
            </div>


            <div className="liveimg">
                <Liveimage 
                    file = {file}
                    handleRemove = {handleRemove}
                    handleChange = {handleChange}
                    isImg = {isImg}
                    ImageStyle = {getImageStyle()}
                    isFirst={isFirst}
                    isLast={isLast}
                    handlePrevious = {handlePrevious}
                    handleNext = {handleNext}
                    domEl = {domEl}
                />
            </div>


            <div className="editor">
                <Editor 
                    min = {selectedOption.range.min}
                    max = {selectedOption.range.max}
                    value = {selectedOption.value}
                    handleChangeSlider = {handleChangeEditor}
                    handleSave={downloadImage}
                    isImg = {isImg}
                />
            </div>


            <div className="values">
                {options.map((option, index)=> {
                    return (
                    <Values 
                        key={index}
                        name={option.name}
                        active={index===selectedOptionIndex}
                        handleClickButton={() => setSelectedOpteionIndex(index)}
                    />
                    )
                })}
            </div>


        </div>
    );
    }
export default HomePage;