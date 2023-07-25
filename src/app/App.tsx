import { ChangeEvent, useEffect, useState } from "react";
// import Wetherapi from '../Api/Wetherapi';
import "./App.scss";
import { BsGithub } from "react-icons/bs";
import { currentWether, fetchCities, forcastWether } from "../Api/Wetherapi";
import Currentwether from "../component/Currentwether";
import WeeklyForcast from "../component/WeeklyForcast";
import { DebounceInput } from "react-debounce-input";
import { cityname } from "../model/cityName.model";
import { curentwethert } from "../model/currentWeather.model";
import { forcastweathert } from "../model/forcastWethaer.model";


function App() {
  const [passingdata, setPassingdata] = useState<curentwethert | null>(null);
  const [passingForcast, setPassingforcast] = useState<forcastweathert[] | null>(null);
  const [itemdiv, setItemdiv] = useState(false);

  const date = new Date();
  const [city, setCity] = useState("");
  const [citynames, setCitynames] = useState<cityname[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

 
  const handleLocation = async (names: any) => {
    const data = await currentWether(names.latitude, names.longitude);
    const forcastData = await forcastWether(names.latitude, names.longitude);

    setPassingdata(data);
    setPassingforcast(forcastData.list);
    
  };

  useEffect(() => {
    const getcityname = async () => {
      const result = await fetchCities(city);
      if (result && result.length > 0) {
        setCitynames(result);
      }
    
    };
    getcityname();
  }, [city]);
 
  return (
    <div className="bg-gradient-to-r from-[#000428]  sm:px-2 md:px-4 to-[#004E92] w-screen  min-h-[100dvh] flex items-center justify-center">
      <div className="md:max-w-[63vw] w-full  min-h-[100dvh] md:min-h-[70vh] p-6 flex flex-col gap-12 overflow-hidden   bg-no-repeat bg-cover bg-[#042354] md:mt-16 md:border-[.5px] md:rounded-xl shadow-xl md:border-gray-300 bg-[url(https://the-weather-forecasting.netlify.app/static/media/bg.e0d46b6d28d5c7baa29c.png)]">
        <div className="relative w-full h-fit">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <h1 className="font-bold  text-cyan-200">
              THE WETHER
              <br />
              FORECASTING
            </h1>
            <div>
              <p className=" text-gray-200">{date.toUTCString()}</p>
            </div>
            <p className="text-3xl text-white">
              <BsGithub />
            </p>
          </div>
          <div
            className="flex flex-row h-auto mt-3 w-full "
            onFocus={() => setItemdiv(true)}
            onBlur={() => setItemdiv(false)}
          >
            <DebounceInput
              className="w-full py-2 ring-1 relative  rounded-lg  text-black bg-white px-4"
              placeholder="Search for cities..."
              onChange={(e) => handleChange(e)}
              debounceTimeout={1000}
            ></DebounceInput>
            {/* <p className='absolute left-[75rem] top-[7rem] text-lg font-semibold'> */}
            {/* <BsArrowDownSquare /> */}
            {/* </p> */}
          </div>
          {itemdiv && (
            <div className="absolute top-full my-2 w-full h-auto px-4 bg-white flex flex-col py-3 gap-2">
              {citynames.map((names) => (
                <div key={names.id}>
                  <p
                    className="border-gray-500 w-full borde-[1px] shadow-md p-2 rounded-sm hover:bg-blue-600 hover:text-white font-semibold"
                    onMouseDown={() => handleLocation(names)}
                  >
                    {names.name}
                  </p>
                  <p>{}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {
          <div className="w-full flex flex-col md:flex-row gap-12">
            {passingdata && (
              <Currentwether
                passingdata={passingdata}
                passingForcast={passingForcast!}
              />
            )}
            {passingForcast && (
              <WeeklyForcast passingForcast={passingForcast} />
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
