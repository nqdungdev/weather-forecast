import { PrecipitationLayer, PressureLayer, RadarLayer, TemperatureLayer, WindLayer } from '@maptiler/weather'

type Props = {
  weatherLayers: {
    [key: string]: {
      layer: PrecipitationLayer | PressureLayer | RadarLayer | TemperatureLayer | WindLayer
      value: string
      units: string
    }
  }
  layerLabel: string
  changeWeatherLayer: (type: string) => void
}

const WeatherMapAside = ({ weatherLayers, layerLabel, changeWeatherLayer }: Props) => {
  return (
    <div className='w-full flex flex-wrap items-center md:flex-col gap-2'>
      {Object.keys(weatherLayers).map((type, index) => (
        <button
          key={index}
          id={type}
          className={`md:w-full bg-accent-blue text-body text-secondary-white capitalize md:uppercase rounded-lg p-2 ${
            layerLabel === type && 'opacity-70'
          }`}
          onClick={() => {
            changeWeatherLayer(type)
          }}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

export default WeatherMapAside
