import React from 'react'

const SearchBar = ({searchTerm,setSearchTerm,placeHolder='Search',cssClass}) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className='nameSearchHolder'>
      <input onChange={handleInputChange} style={{fontSize:'20px'}} value={searchTerm} type="text" className={cssClass} placeholder={placeHolder}/>
    </div>
  )
}

export default SearchBar
