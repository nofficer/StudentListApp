import React, { useEffect } from 'react'

const StudentCards = ({data,mobileFontModifier,searchTerm}) => {



  const renderGPA = (item) => {
    let gpa = item.grades.reduce((accumulator, curValue) => accumulator + Number(curValue), 0)/item.grades.length
    return gpa.toString() + '%'

  }
  const renderData = () => {

    if(Array.isArray(data)){
      return data.map((item) => {
        let firstName = item['firstName'].toLowerCase()
        let lastName = item['lastName'].toLowerCase()
        if( searchTerm === '' || firstName.includes(searchTerm.toLowerCase()) || lastName.includes(searchTerm.toLowerCase())){
          return (
            <div className='studentCard'  key={firstName+lastName}>

              <img className='image'  src={item.pic}/>

              <div className='infoHolder'>
                <div className='infoNameDiv' style={{fontFamily:'Raleway-Bold',fontSize:`${38*mobileFontModifier}px`,letterSpacing:'0.001em',marginTop:'1vh'}}>{firstName.toUpperCase()} {lastName.toUpperCase()}</div>
                <div className='infoDiv'>Email: {item['email']}</div>
                <div className='infoDiv'>Skill: {item['skill']}</div>
                <div className='infoDiv'>Average: {renderGPA(item)}</div>
              </div>


            </div>
          )
        }

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
