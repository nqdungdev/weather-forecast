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
    <div className='w-full flex flex-col gap-2'>
      {Object.keys(weatherLayers).map((type, index) => (
        <button
          key={index}
          id={type}
          className={`w-full bg-accent-blue text-body text-secondary-white uppercase rounded-lg p-2 ${
            layerLabel === type && 'opacity-50'
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
