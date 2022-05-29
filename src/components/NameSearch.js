import React from 'react'

const NameSearch = ({searchTerm,setSearchTerm}) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className='nameSearchHolder'>
      <input onChange={handleInputChange} style={{fontSize:'20px'}} value={searchTerm} type="text" className='nameSearch' placeholder='Search by name'/>
    </div>
  )
}

export default NameSearch
