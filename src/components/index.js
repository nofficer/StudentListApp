import React, {useState,useEffect} from 'react'
import api from '../apis/api'
import index from '../index.css'
import SearchBar from './SearchBar'
import StudentCards from './StudentCards'
import useWindowDimensions from '../hooks/isMobile'

const Index = () => {
  const [data,setData] = useState([])
  const [marginModifier,setMarginModifier] = useState(1)
  const [heightModifier,setHeightModifier] = useState(1)
  const [mobileFontModifier, setMobileFontModifier] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileInfoFontModifier, setMobileInfoFontModifier] = useState(1)
  const [tagSearchTerm, setTagSearchTerm] = useState('')
  const getData = async () => {
    let tempData = await api.get('/')
    setData(tempData.data.students)
  }
  const [windowDimensions,isMobile] = useWindowDimensions()
  let tablet=1
  if(windowDimensions.width>700 && isMobile){
    tablet=3
  }

  useEffect(()=> {
    getData()

    if(isMobile){
      setMarginModifier(0)
      setHeightModifier(100/80)
      setMobileFontModifier(0.45*tablet)
      setMobileInfoFontModifier(0.65*tablet)
    }
  },[])

  return(


    <div style={{marginTop:`${4*marginModifier}%`,marginRight:`${20*marginModifier}%`,marginLeft:`${20*marginModifier}%`,height:`${80*heightModifier}vh`}} className='studentListHolder'>
      <SearchBar placeHolder='Search by name' cssClass='nameSearch' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchBar placeHolder='Search by tag' cssClass='nameSearch' searchTerm={tagSearchTerm}setSearchTerm={setTagSearchTerm} />
      <StudentCards tablet={tablet} tagSearchTerm={tagSearchTerm} setData={setData} mobileInfoFontModifier={mobileInfoFontModifier} isMobile={isMobile} searchTerm={searchTerm} tagSearchTerm={tagSearchTerm} data={data} mobileFontModifier={mobileFontModifier}/>
    </div>


  )
}

export default Index;
