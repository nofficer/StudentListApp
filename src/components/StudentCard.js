import React, {useState,useEffect,useMemo} from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";
import index from '../index.css'
const StudentCard = ({mobileFontModifier,searchTerm,item,isMobile,mobileInfoFontModifier,data,setData,tagSearchTerm,tablet}) => {
  const [expanded,setExpanded] = useState(false)
  const [imageSpacerClass,setImageSpacerClass] = useState('imageSpacer')
  const [tagInput,setTagInput] = useState('')
  const [tags,setTags] = useState([])



  useEffect(() => {
    if(isMobile && tablet===1){
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
  const gpa = useMemo(() => renderGPA(item),[item])

// Expand the student card to show individual test scores
  const handleExpand = () => {
    setExpanded(true)
  }
// Close the expanded student card
  const handleClose = () => {
    setExpanded(false)
  }
// Submit a new tag to be added to the student
  const handleSubmit = (e) =>{
    e.preventDefault();
    let newTags = [...tags]
    let trimmed = tagInput
    trimmed = trimmed.trim()
    if(trimmed.length>0){
      newTags.push(trimmed)
      setTags(newTags)
      setTagInput('')
    }
  }
// Render the tags on the student card
  const renderTags = () => {

    return tags.map((tag,i) => {
      return <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} key={i+'_'+tag+item.id} className='tagDiv'> <span className="Centerer"></span> <span style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='Centered'>{tag}</span> <span className="Centerer"></span></div>
    })
  }
// Render the test scores on the student card only IF the + has been clicked and the student card expanded
  const renderTestScores = () => {
    if(Array.isArray(item.grades)){
      return item.grades.map((grade,i) => {
        return (
          <div key={item.id+'_Test_Scores'+i} className='testScoreHolder'>
          <div style={{fontSize:`${16*mobileInfoFontModifier}px`}}  className='testScore'>Test {i+1}:</div> <div style={{fontSize:`${16*mobileInfoFontModifier}px`}}>{grade}%</div>
          </div>
        )
      })
    }
    else return (
      <div className='testScoreHolder'>
        <div style={{fontSize:`${16*mobileInfoFontModifier}px`}}  className='testScore'>N/A</div>
      </div>
  )

  }

  const checkTags = () => {
    let includeFlag = false
    if(Array.isArray(item.grades)){
      tags.forEach((tag) => {
        let term = tagSearchTerm.toLowerCase()
        if(tag.toLowerCase().includes(term)){
          includeFlag = true

        }
      })
      return includeFlag
    }
    else {
      console.log('item.grades in state is not an array')
      return includeFlag
    }

  }

  const checkSearchTerms = (firstName,lastName) => {
    let firstAndLast = firstName + ' ' + lastName
    if(searchTerm === '' && tagSearchTerm === ''){
      return true
    }
    else if(searchTerm === '' && checkTags()){
      return true
    }
    else if(tagSearchTerm === '' && (firstName.includes(searchTerm.toLowerCase()) || lastName.includes(searchTerm.toLowerCase()) || firstAndLast.includes(searchTerm.toLowerCase())) ){
      return true
    }
    else if(checkTags() && (firstName.includes(searchTerm.toLowerCase()) || lastName.includes(searchTerm.toLowerCase())) || firstAndLast.includes(searchTerm.toLowerCase())){
      return true
    }

  }

  let firstName = item['firstName'].toLowerCase()
  let lastName = item['lastName'].toLowerCase()
  // I'm using a css styled div to keep the individual test scores in the testScoresCard in line with the student info that sits above it. I chose this route because I wanted to attempt this assignment without using Material UI. Although if I were to build with material UI this would be accomplished fairly easily using a grid.
  // I use inline css at times when I need to programmatically alter the font, the alternative is to conditionally use a different CSS class which I have utilized in the case of the image.
  // We conditionally render a button for mobile users to add tags as there is no way for the
  if( checkSearchTerms(firstName,lastName)){
    return (
      <div className='studentCardHolder'>
        <div  className='studentCard'>
          {isMobile && tablet===1 ? <img className='mobileImage'  src={item.pic}/> : <img className='image'  src={item.pic}/>}
          <div className='infoHolder'>
            <div className='infoNameDiv' style={{fontFamily:'Raleway-Bold',fontSize:`${38*mobileFontModifier}px`}}>
              <div  style={{fontFamily:'Raleway-Bold',fontSize:`${38*mobileFontModifier}px`,letterSpacing:'0.001em',marginTop:'0.25em'}}>{firstName.toUpperCase()} {lastName.toUpperCase()}</div>
              {!expanded ? <button onClick={handleExpand} style={{fontSize:`${38*mobileFontModifier}px`}} className='expandButton' ><FaPlus/></button> : <button onClick={handleClose} style={{fontSize:`${38*mobileFontModifier}px`}} className='expandButton' ><FaMinus/></button>}
            </div>
            <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='infoDiv'>Email: {item['email']}</div>
            <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='infoDiv'>Skill: {item['skill']}</div>
            <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='infoDiv'>Average: {gpa}</div>
          </div>
        </div>
        <div  className='testScoresCard'  >
       <div style={{opacity:0}} className={imageSpacerClass}> </div>
          <div className='infoHolder'>
          {expanded && renderTestScores()}
          <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='testScore' >{renderTags()}</div>
          <div style={{fontSize:`${16*mobileInfoFontModifier}px`}} className='testScore'>
            <form className='addTagForm' onSubmit={handleSubmit}>

               <input style={{fontSize:`${16*mobileInfoFontModifier}px`}}  value={tagInput} onChange={(e) => setTagInput(e.target.value)} type="text" className='addTagInput' placeholder='Add a tag' />


            </form>
          </div>
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
