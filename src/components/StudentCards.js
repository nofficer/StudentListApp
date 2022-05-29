import React, { useEffect } from 'react'

import StudentCard from './StudentCard'


const StudentCards = ({data,mobileFontModifier,searchTerm,isMobile,mobileInfoFontModifier}) => {

  const renderData = () => {

    if(Array.isArray(data)){
      return data.map((item) => {
        return <StudentCard mobileInfoFontModifier={mobileInfoFontModifier} isMobile={isMobile} key={item.firstName+item.lastName} item={item} searchTerm={searchTerm} mobileFontModifier={mobileFontModifier}/>
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
