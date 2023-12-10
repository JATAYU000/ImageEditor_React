import React from 'react';
import {MdSearch} from 'react-icons/md';
const Search = ({handleSearchImage}) => {
    return <div className='search'>
        <MdSearch className='search-icons'size='1.5em'/>
        <input 
            className='Search-box'
            onChange={(event)=>handleSearchImage(event.target.value)} 
            type="text" 
            placeholder="Type to search..."></input>
    </div>;

    
};
export default Search;