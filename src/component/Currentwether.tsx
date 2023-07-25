import React from "react";
import { BsClouds, BsWind, BsThermometerHalf } from "react-icons/bs";
// import { GiSoapExperiment } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
import dayjs from "dayjs";
import { curentwethert } from "../model/currentWeather.model";
import { forcastweathert } from "../model/forcastWethaer.model";
interface Props {
  passingdata:curentwethert ;
  passingForcast: forcastweathert[];
}
const Currentwether: React.FC<Props> = ({ passingdata, passingForcast }) => {
  
  const date = new Date();
  const tday = dayjs().format("YYYY MM DD");

  const todayForcast = passingForcast.filter((days) => {
    const dt = dayjs(days.dt_txt).format("YYYY MM DD");

    return dt === tday;
  });


  const dayLength = todayForcast.length;

  return (
    <div className="flex-1 flex flex-col gap-">
      <div className="w-full g-yellow-300 flex flex-col">
        <div className="w-full g-cyan-300 flex  justify-center">
          <h1 className=" font-semibold text-gray-300">CURRENT WETHER</h1>
        </div>
        <div className="w-full h-3/4 g-purple-500 py-4 flex text-white flex-row">
          <div className="w-1/3 h-full g-orange-600 flex items-center  flex-col">
            <h1 className="font-semibold py-2">{passingdata.name}</h1>
            <p className="font-light py-1 text-sm text-gray-200">
              {date.toDateString()}
            </p>
          </div>
          <div className="w-1/3 h-full g-orange-400 flex items-center  flex-col">
            <h1 className="font-semibold py-2">
              {passingdata.main?.temp}&deg;C
            </h1>
            <p className="font-light text-sm py-1 text-gray-200">description</p>
          </div>
          <div className="w-1/3 h-full py-3 g-orange-800 flex items-center justify-center flex-col text-[3rem]">
            <BsClouds />
          </div>
        </div>
      </div>

      <div className="w-full g-orange-600 flex  py-4 items-center  flex-col">
        <div className="w-full g-cyan-300 py-4 flex text-gray-300  font-semibold justify-center">
          AIR CONDITIONS
        </div>
        <div className="w-full h-full g-orange-300 flex   flex-row">
          <div className="w-1/4 h-full flex items-center flex-col  b-orange-900">
            <div className="w-full h-1/2 b-red-500 flex py-2 flex-row gap-1 justify-center items-center">
              <p className="text-gray-200">
                {" "}
                <BsThermometerHalf />
              </p>
              <p className=" font-light text-gray-200 text-sm"> Real feel</p>
            </div>
            <p className="text-white py-2">
              {passingdata.main?.feels_like}&deg;C
            </p>
          </div>

          <div className="w-1/4 h-full flex items-center flex-col g-orange-700">
            <div className="w-full h-1/2 g-red-500 py-2 flex flex-row gap-1 justify-center items-center">
              <p className="text-gray-200">
                {" "}
                <BsWind />
              </p>
              <p className=" font-light   text-gray-200 text-sm"> Wind</p>
            </div>
            <p className="text-white py-2">{passingdata.wind?.speed} m/s</p>
          </div>
          <div className="w-1/4 h-full flex items-center flex-col g-orange-900">
            <div className="w-full h-1/2 py-2 g-red-500 flex flex-row gap-1 justify-center items-center">
              <p className="text-gray-200">
                {" "}
                <BsClouds />
              </p>
              <p className=" font-light text-gray-200 text-sm"> Clouds</p>
            </div>
            <p className="text-white py-2"> {passingdata.clouds?.all} %</p>
          </div>
          <div className="w-1/4 h-full flex items-center flex-col g-orange-300">
            <div className="w-full h-1/2 py-2 g-red-500 flex flex-row gap-1 justify-center items-center">
              <p className="text-gray-200 text-xl">
                {" "}
                <WiHumidity />
              </p>
              <p className=" font-light text-gray-200 text-sm"> Humidity</p>
            </div>
            <p className="text-white py-2">{passingdata.main?.humidity} %</p>
          </div>
        </div>
      </div>
      {/* //////////today forcast///////////// */}

      <div className=" w-full h-fill md:px-4 gap-4 py-4 flex flex-col g-green-500">
        <div className="w-full h-1/3 b-cyan-300 flex  flex-col items-center justify-center">
          <h1 className=" font-semibold text-gray-300">TODAY'S FORECAST</h1>
          <p className=" font-light text-cyan-400 text-sm">
            {dayLength} available forecasts
          </p>
        </div>
        <div className=" w-full h-3/4 flex gap-2 md:px-4  items-center justify-center flex-row g-blue-600">
          {todayForcast.map((day) => (
            <div key={day.dt_txt} className=" h-full text-white rounded-lg p-5 bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center  ">
              <p className="font-light text-gray-200 text-sm">
                {dayjs(day.dt_txt).format("HH MM")}
              </p>
              <p className="text-4xl ">
                {" "}
                <BsClouds />
              </p>
              <p>{day.main?.temp}&deg;C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Currentwether;
