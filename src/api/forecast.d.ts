
interface IForecastByDate   {
    "dt": number,
    "main": {
      "temp": number,
      "temp_min": number
      "temp_max": number,
      "pressure": number
      "sea_level": number
      "grnd_level": number
      "humidity": number
      "temp_kf": number
    },
    "weather": [
      {
        "id": number
        "main": string
        "description": string
        "icon": string
      }
    ],
    "clouds": {
      "all": number
    },
    "wind": {
      "speed": number
      "deg": number
    },
    "snow": {},
    "sys": {
      "pod": string
    },
    "dt_txt": string
  }

interface IForecast {
    "cod": string,
    "message": number
    "cnt": number,
    "list": IForecastByDate[],
    "city": {
      "id": number
      "name": string
      "coord": {
        "lat": number
        "lon": number
      },
      "country": string
    }
  }

  interface IForecastGroup {
      [key: string] : IForecastByDate[]
  }