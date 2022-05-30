import React, { useEffect,useState } from 'react'

import StudentCard from './StudentCard'


const StudentCards = ({data,mobileFontModifier,searchTerm,isMobile,mobileInfoFontModifier,tagSearchTerm}) => {
  const [tagObj, setTagObj] = useState({})



  const renderData = () => {

    if(Array.isArray(data)){
      return data.map((item) => {
        return <StudentCard tagSearchTerm={tagSearchTerm} tagObj={tagObj} setTagObj={setTagObj} data={data} setData={data} mobileInfoFontModifier={mobileInfoFontModifier} isMobile={isMobile} key={item.id} item={item} searchTerm={searchTerm} mobileFontModifier={mobileFontModifier}/>
      })
    }
    else{
      return <div>No Data Available please check with system administrator.</div>
    }

  }

  return (
    <>
    {renderData()}
    </>
  )
}

export default StudentCards
