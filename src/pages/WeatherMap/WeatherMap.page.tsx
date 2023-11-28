import Card from '~/components/card/Card'
import { useRef, useEffect, useState, useCallback } from 'react'
import { config, LngLat, Map, MapMouseEvent, MapStyle, Marker } from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import {
  ColorRamp,
  PrecipitationLayer,
  PressureLayer,
  RadarLayer,
  TemperatureLayer,
  WindLayer
} from '@maptiler/weather'
import WeatherInfo from './infor/WeatherInfo'
import WeatherMapAside from './aside/WeatherMapAside'

const WeatherMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map | null>(null)
  const [layerLabel, setLayerLabel] = useState('wind')
  const pointerDataDiv = useRef<HTMLSpanElement>(null)
  // const [activeLayer, setActiveLayer] = useState<string>('wind')
  const activeLayer = useRef('wind')
  // const tokyo = { lng: 139.753, lat: 35.6844 }
  // const [zoom] = useState(14)

  config.apiKey = 'K77QqbjAUgGoACHLoRRO'

  const weatherLayers: {
    [key: string]: {
      layer: PrecipitationLayer | PressureLayer | RadarLayer | TemperatureLayer | WindLayer
      value: string
      units: string
    }
  } = {
    precipitation: {
      layer: new PrecipitationLayer({ id: 'precipitation' }),
      value: 'value',
      units: ' mm'
    },
    pressure: {
      layer: new PressureLayer({
        opacity: 0.8,
        id: 'pressure'
      }),
      value: 'value',
      units: ' hPa'
    },
    radar: {
      layer: new RadarLayer({
        opacity: 0.8,
        id: 'radar'
      }),
      value: 'value',
      units: ' dBZ'
    },
    temperature: {
      layer: new TemperatureLayer({
        colorramp: ColorRamp.builtin.TEMPERATURE_3,
        id: 'temperature'
      }),
      value: 'value',
      units: '°'
    },
    wind: {
      layer: new WindLayer({ id: 'wind' }),
      value: 'speedMetersPerSecond',
      units: ' m/s'
    }
  }

  const changeWeatherLayer = useCallback((type: string) => {
    if (type !== activeLayer.current) {
      if (map?.current?.getLayer(type)) {
        const activeWeatherLayer = weatherLayers[activeLayer.current]?.layer
        if (activeWeatherLayer) {
          map?.current?.setLayoutProperty(activeLayer.current, 'visibility', 'none')
        }
      }

      if (map?.current?.getLayer(type)) {
        map?.current?.setLayoutProperty(type, 'visibility', 'visible')
      } else {
        map?.current?.addLayer(weatherLayers[type].layer, 'Water')
      }
      activeLayer.current = type
      setLayerLabel(type)
    }
  }, [])

  const mapLoadHandler = () => {
    map?.current?.setPaintProperty('Water', 'fill-color', 'rgba(0, 0, 0, 0.4)')
    changeWeatherLayer('radar')
  }

  const mouseOutHandler = (evt: MapMouseEvent) => {
    if (!evt.originalEvent.relatedTarget) {
      ;(pointerDataDiv.current as HTMLSpanElement).innerText = ''
    }
  }

  const updatePointerValue = (lngLat: LngLat) => {
    if (!lngLat) return
    // pointerLngLat = lngLat
    const weatherLayer = weatherLayers[activeLayer.current]?.layer
    const weatherLayerValue = weatherLayers[activeLayer.current]?.value
    const weatherLayerUnits = weatherLayers[activeLayer.current]?.units
    if (weatherLayer) {
      const value: any = weatherLayer.pickAt(lngLat.lng, lngLat.lat)
      console.log(value)
      if (!value) {
        ;(pointerDataDiv.current as HTMLSpanElement).innerText = ''
        return
      }
      ;(pointerDataDiv.current as HTMLSpanElement).innerText =
        value && `${value[weatherLayerValue].toFixed(1)}${weatherLayerUnits}`
    }
  }

  const mouseMoveHandler = (e: MapMouseEvent) => {
    updatePointerValue(e.lngLat)
  }

  useEffect(() => {
    if (map.current) return // stops map from intializing more than once

    map.current = new Map({
      container: mapContainer.current as HTMLDivElement,
      style: MapStyle.DATAVIZ.DARK,
      // center: [tokyo.lng, tokyo.lat],
      // zoom: zoom
      hash: true
    })

    map.current.on('load', mapLoadHandler)
    map.current.on('mouseout', mouseOutHandler)
    map.current.on('mousemove', mouseMoveHandler)

    // map.current.on('load', () => {
    //   // Make the water layer a bit transparent:
    //   map?.current?.setPaintProperty('Water', 'fill-color', 'rgba(0, 0, 0, 0.5)')

    //   // Add the weather layer underneath the `water` layer:
    //   map?.current?.addLayer(layer, 'Water')
    // })

    // new Marker({ color: '#FF0000' }).setLngLat([139.7525, 35.6846]).addTo(map.current)

    return () => {
      map?.current?.off('load', mapLoadHandler)
    }
  }, [])

  return (
    <div className='grid grid-cols-12'>
      <Card className='col-span-8'>
        <div className='relative w-full h-[calc(100vh_-_77px)]'>
          <WeatherInfo layerLabel={layerLabel} ref={pointerDataDiv} />
          <div ref={mapContainer} className='absolute w-full h-full'></div>
        </div>
      </Card>

      <Card className='col-span-4'>
        <WeatherMapAside
          weatherLayers={weatherLayers}
          layerLabel={layerLabel}
          changeWeatherLayer={changeWeatherLayer}
        />
      </Card>
    </div>
  )
}

export default WeatherMap
