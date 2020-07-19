export const getShortDate = (date: string): string =>{ 
	const d = new Date(date)
	const year = d.getFullYear()
	const day = d.getDate()
	const month = d.getMonth()
	return `${month}-${day}-${year}`
}

export const  groupForecastByDate = (forecastData: IForecast) =>{
    return forecastData.list.reduce((acc: any, current: any) => {
	    const id = getShortDate(current.dt_txt); 
	        return {...acc, [id]: Array.isArray(acc[id]) ? [...acc[id], current ] : [current] }
    }, {})
}

export const getForecastByDate = (date: string, forecastGroup: IForecastGroup | undefined): IForecastByDate[] | undefined => {
    if(date && forecastGroup) {
        return forecastGroup[date]
    }
}