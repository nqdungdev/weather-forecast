import Card from '~/components/card/Card'
import { useRef, useEffect, useState, useCallback } from 'react'
import { config, geocoding, GeolocationType, LngLat, Map, MapMouseEvent, MapStyle, Marker } from '@maptiler/sdk'
import { createMapLibreGlMapController } from '@maptiler/geocoding-control/maplibregl-controller'
import '@maptiler/geocoding-control/style.css'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import {
  ColorRamp,
  PrecipitationLayer,
  PressureLayer,
  RadarLayer,
  TemperatureLayer,
  WindLayer
} from '@maptiler/weather'
import WeatherMapInfo from './infor/WeatherMapInfo'
import WeatherMapAside from './aside/WeatherMapAside'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useOutletContext } from 'react-router-dom'

const WeatherMap = () => {
  // const [mapController, setMapController] = useState<MapController>()
  const [, setMapController] = useOutletContext()
  const { cityPicker } = useSelector((state: RootState) => state.geoSlice)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map | null>(null)
  const marker = useRef(null)
  const [layerLabel, setLayerLabel] = useState('temperature')
  const pointerDataDiv = useRef<HTMLSpanElement>(null)
  const activeLayer = useRef('temperature')

  config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY
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
    changeWeatherLayer('wind')
    reverseGeocoding({ lng: cityPicker.center[0], lat: cityPicker.center[1] } as LngLat)
  }

  const mouseOutHandler = (evt: MapMouseEvent) => {
    if (!evt.originalEvent.relatedTarget) {
      ;(pointerDataDiv.current as HTMLSpanElement).innerText = ''
    }
  }

  const mouseClickHandler = (evt: MapMouseEvent) => {
    reverseGeocoding(evt.lngLat)
  }

  const updatePointerValue = (lngLat: LngLat) => {
    if (!lngLat) return
    // pointerLngLat = lngLat
    const weatherLayer = weatherLayers[activeLayer.current]?.layer
    const weatherLayerValue = weatherLayers[activeLayer.current]?.value
    const weatherLayerUnits = weatherLayers[activeLayer.current]?.units
    if (weatherLayer) {
      const value: any = weatherLayer.pickAt(lngLat.lng, lngLat.lat)

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

  const reverseGeocoding = async (lngLat: LngLat) => {
    if (!lngLat.lng || !lngLat.lat) return

    const result = await geocoding.reverse([lngLat.lng, lngLat.lat])
    // document.getElementById('results').innerHTML = JSON.stringify(result, null, 2)
    console.log(result)

    if (marker.current) {
      marker.current?.setLngLat([lngLat.lng, lngLat.lat])
    } else {
      marker.current = new Marker({ color: '#FF0000' }).setLngLat([lngLat.lng, lngLat.lat]).addTo(map.current)
    }
    map?.current?.flyTo({
      center: [lngLat.lng, lngLat.lat],
      // padding: { right: window.innerWidth / 2 },
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    })
  }

  useEffect(() => {
    if (map.current) return // stops map from intializing more than once

    map.current = new Map({
      container: mapContainer.current as HTMLDivElement,
      style: MapStyle.DATAVIZ.DARK,
      geolocate: GeolocationType.POINT,
      // center: [cityPicker.center[0], ityPicker.center[1]],
      // zoom: zoom
      hash: true
    })

    map.current.on('load', mapLoadHandler)
    map.current.on('mouseout', mouseOutHandler)
    map.current.on('mousemove', mouseMoveHandler)
    map.current.on('click', mouseClickHandler)

    // map.current.on('load', () => {
    //   // Make the water layer a bit transparent:
    //   map?.current?.setPaintProperty('Water', 'fill-color', 'rgba(0, 0, 0, 0.5)')

    //   // Add the weather layer underneath the `water` layer:
    //   map?.current?.addLayer(layer, 'Water')
    // })
    setMapController(createMapLibreGlMapController(map.current, maplibregl))

    // new Marker({ color: '#FF0000' }).setLngLat([city.coord.lon, city.coord.lat]).addTo(map.current)

    return () => {
      map?.current?.off('load', mapLoadHandler)
    }
  }, [])

  useEffect(() => {
    reverseGeocoding({ lng: cityPicker.center[0], lat: cityPicker.center[1] } as LngLat)
    return () => {}
  }, [cityPicker])

  return (
    <div className='grid grid-cols-12'>
      <Card className='col-span-12 md:col-span-4 md:order-2'>
        <WeatherMapAside
          weatherLayers={weatherLayers}
          layerLabel={layerLabel}
          changeWeatherLayer={changeWeatherLayer}
        />
      </Card>
      <Card className='col-span-12 md:col-span-8 md:order-1'>
        <div className='relative w-full h-[calc(100vh_-_77px)]'>
          <WeatherMapInfo layerLabel={layerLabel} ref={pointerDataDiv} />
          {/* <GeocodingControl apiKey={import.meta.env.VITE_MAPTILER_API_KEY} mapController={mapController} /> */}
          <div ref={mapContainer} className='absolute w-full h-full'></div>
        </div>
      </Card>
    </div>
  )
}

export default WeatherMap
