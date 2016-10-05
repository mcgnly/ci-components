export const style = 'mapbox://styles/jontore/cirm72ko3001qh1nsj0xw5i72';
export const token = 'pk.eyJ1Ijoiam9udG9yZSIsImEiOiI0anZPRXZJIn0.K67QPBz-IP3FtEGdXuuUCg';

export const sourceOptions = {
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
};

export const smallConfig = {
    height: '500px'
};

let apiURL;
if (__LOCAL__) {
    apiURL = 'api.relayr.io';
} else if (__PRODUCTION__) {
    apiURL = 'api.relayr.io';
}

export const ApiURL = apiURL;
