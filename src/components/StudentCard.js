import React, {useState,useEffect} from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";

const StudentCard = ({mobileFontModifier,searchTerm,item,isMobile,mobileInfoFontModifier}) => {
  const [expanded,setExpanded] = useState(false)
  const [imageSpacerClass,setImageSpacerClass] = useState('imageSpacer')

  useEffect(() => {
    if(isMobile){
      setImageSpacerClass('mobileImageSpacer')
    }
  },[])

// Calculate GPA from individual scores
  const renderGPA = (item) => {
    if(Array.isArray(item.grades)){
      let gpa = item.grades.reduce((accumulator, curValue) => accumulator + Number(curValue), 0)/item.grades.length
      return gpa.toString() + '%'
    }
    else{
      return 'N/A'
    }
  }

  const handleExpand = () => {

    setExpanded(true)

  }

  const handleClose = () => {

    setExpanded(false)
  }

  const renderTestScores = () => {
    return item.grades.map((grade,i) => {
      return (
        <div key={i} className='testScoreHolder'>
        <div style={{fontSize:`${16*mobileInfoFontModifier}px`}}  className='testScore'>Test {i+1}:</div> <div style={{fontSize:`${16*mobileInfoFontModifier}px`}}>{grade}%</div>
        </div>
      )
    })
  }

  let firstName = item['firstName'].toLowerCase()
  let lastName = item['lastName'].toLowerCase()
  // I'm using a css styled div to keep the individual test scores in the testScoresCard in line with the student info that sits above it. I chose this route because I wanted to attempt this assignment without using Material UI. Although if I were to build with material UI this would be accomplished fairly easily using a grid.
  // Check if search term exists in the students first OR last name
  if( searchTerm === '' || firstName.includes(searchTerm.toLowerCase()) || lastName.includes(searchTerm.toLowerCase())){

    return (
      <div className='studentCardHolder'>
        <div  className='studentCard'>

          {!isMobile ? <img className='image'  src={item.pic}/> : <img className='mobileImage'  src={item.pic}/>}

          <div className='infoHolder'>
            <div className='infoNameDiv' style={{fontFamily:'Raleway-Bold',fontSize:`${38*mobileFontModifier}px`,letterSpacing:'0.001em',marginTop:'0.25em'}}>
              <div  style={{fontFamily:'Raleway-Bold',fontSize:`${38*mobileFontModifier}px`,letterSpacing:'0.001em',marginTop:'0.25em'}}>{firstName.toUpperCase()} {lastName.toUpperCase()}</div>

              {!expanded ? <button onClick={handleExpand} style={{fontSize:`${38*mobileFontModifier}px`}} className='expandButton' ><FaPlus/></button> : <button onClick={handleClose} style={{fontSize:`${38*mobileFontModifier}px`}} className='expandButton' ><FaMinus/></button>}
            </div>
            <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='infoDiv'>Email: {item['email']}</div>
            <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='infoDiv'>Skill: {item['skill']}</div>
            <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='infoDiv'>Average: {renderGPA(item)}</div>


          </div>

        </div>
        <div  className='testScoresCard'  key={firstName+lastName}>

      { expanded ? <div style={{opacity:0}} className={imageSpacerClass}> </div> : null}
          <div className='infoHolder'>
          {expanded ? renderTestScores() : null}
          </div>
        </div>

      </div>
    )
  }
  else {
    return null;
  }

}

export default StudentCard
