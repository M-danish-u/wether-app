// import { BsCloudRain, BsWind } from "react-icons/bs";
import { AiOutlineCloud } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import dayjs from "dayjs";
import { WeatherIcons } from "../icons/WeatherIcons.json";
import "weather-icons/css/weather-icons.css";
import { BsWind, BsThermometerHalf } from "react-icons/bs";
import { forcastweathert } from "../model/forcastWethaer.model";

interface Props {
  passingForcast: forcastweathert[];
}
const WeeklyForcast: React.FC<Props> = ({ passingForcast }) => {
  

  const tday = dayjs().format("DD");
  

  
  const weekly:forcastweathert[] = [];

  

   passingForcast.filter((days) => {
    const dt = dayjs(days.dt_txt).format("DD");
    

    if (dt !== tday) {
      if (weekly.length === 0) weekly.push(days);

      if (dayjs(weekly[weekly.length - 1].dt_txt).format("DD") !== dt)
        weekly.push(days);
    }
  });
  

  return (
    <div className="flex-1 flex flex-col gap-2 md:gap-1  g-green-500">
      <div className="w-full items-center  flex-col  justify-center flex">
        <h1 className="font-semibold text-gray-300 py-2">WEEKLY FORECAST</h1>
      </div>

      {weekly.map((item) => (
        <div key={item.dt} className="w-full h-[5.5rem] bg-white/10 hover:bg-white/20 flex flex-row  text-white overflow-hidden  rounded-lg">
          <div className="w-1/3  flex flex-col items-center g-red-500">
            <h1 className="font-semibold">
              {dayjs(item.dt_txt).format("dddd")}
            </h1>
            <div className="w-full h-24 flex-row items-center flex px-8 gap-2 text-gray-200 g-slate-500">
              <p className="text-2xl">
                {" "}
                <i
                  className={`wi wi-${(WeatherIcons as any)[item.weather[0].id].icon}`}
                ></i>
              </p>
              <p className="font-light text-gray-200 text-sm">
                {item.weather[0]?.description}
              </p>
            </div>
          </div>
          <div className="w-1/3  g-red-600">
            <div className="w-full h-1/2 flex flex-row items-center gap-2 justify-center g-red-900">
              <p className="text-gray-300">
                {" "}
                <BsThermometerHalf />
              </p>
              <p className="font-semibold text-sm">
                {item.main.feels_like}&deg;C
              </p>
            </div>
            <div className="w-full h-1/2 flex flex-row items-center gap-2 justify-center g-red-200">
              <p className="text-gray-300 text-xl">
                {" "}
                <AiOutlineCloud />
              </p>
              <p className="font-semibold text-sm">{item.clouds.all}&deg;C</p>
            </div>
          </div>
          <div className="w-1/3  g-red-800">
            <div className="w-full h-1/2 flex flex-row items-center gap-2 justify-center g-red-900">
              <p className="text-gray-300">
                {" "}
                <BsWind />
              </p>
              <p className="font-semibold text-sm">{item.wind.speed}&deg;C</p>
            </div>
            <div className="w-full h-1/2 flex flex-row items-center gap-2 justify-center b-red-200">
              <p className="text-gray-300 text-2xl">
                {" "}
                <WiHumidity />
              </p>
              <p className="font-semibold text-sm">
                {item.main.humidity}&deg;C
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForcast;
