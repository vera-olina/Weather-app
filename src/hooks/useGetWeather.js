import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
// import { WEATHER_API_KEY } from '@env'

export const useGetWether = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState([])
    const [lat, setLat] = useState([])
    const [lon, setLon] = useState([])
    const WEATHER_API_KEY = 'd87cf13f2276f9c7c71f062241e6d822'

    const fetchWeatherData = async () => {
        try {
          const res = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
          )
          const data = await res.json()
          setWeather(data)
        } catch (error) {
          setError('Could not fetch weather')
        } finally {
          setLoading(false)
        }
      }
    
      useEffect(()=>{
        (async() => {
          let { status } = await Location.requestForegroundPermissionsAsync()

          if (status !== 'granted') {
            setError('permission to access location was denied')
            return 
          }
          let location = await Location.getCurrentPositionAsync()
          setLat(location.coords.latitude)
          setLon(location.coords.longitude)
          await fetchWeatherData()
        })()
      }, [lat, lon])
      return [loading, error, weather]
}