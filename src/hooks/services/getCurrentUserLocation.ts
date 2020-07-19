export interface IGetUserCurrentLocation {
    currentLocation: PositionCallback
    showErrors: PositionErrorCallback
}

export const getUserCurrentLocation = async ({currentLocation, showErrors} : IGetUserCurrentLocation): Promise<boolean> =>{
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(currentLocation, showErrors);
        return true;
      } else {
        return false
      }
}
