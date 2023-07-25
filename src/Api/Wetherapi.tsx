import axios from "axios";

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const RAPIDAPI_HOST='wft-geo-db.p.rapidapi.com'
const RAPIDAPI_KEY='8ac14f623amsh3f3a5a562ffb430p18eadfjsneff91f2cd14d'

// const WEATHER_API_URL =



export const fetchCities = async (city:string)=>{
  try{
    const {data}= await axios.get( `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${city}`,{
      headers:{
        'X-RapidAPI-Key':RAPIDAPI_KEY,
        'X-RapidAPI-HOST':RAPIDAPI_HOST,
      },
      
    });
    
    return data.data

  }catch (error){
console.log(error);

  }
}

////////////// current wether api////////////

const CURRENT_WETHER_API_key='f483be7c4755108c66e7fabf97f291cd'


export const currentWether= async (lat:number,lon:number)=>{
  try {
    const wetherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CURRENT_WETHER_API_key}&units=metric`)
    
    return wetherData.data
    
   
    
  } catch (error) {
    console.log(error);
    
   
    
    
    
  }
}
// /////////forcast wether api////////////////


export const forcastWether= async (lat:number,lon:number)=>{
  try {
   const forcastWetherData= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${CURRENT_WETHER_API_key}&units=metric`)
  return forcastWetherData.data
 
  } catch (error) {
    console.log(error);
   
    
  }
}


