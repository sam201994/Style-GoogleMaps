import React from 'react';
import config from '../../../config';


function createMap(color) {
    function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.674, lng: -73.945 },
            zoom: 12,
            styles: color,
        });
    }

    function fetchMap() {
        window.initMap = initMap;
        const ref = window.document.getElementById('mapContainer');
        const script = window.document.createElement('script');
        script.src = config.googleApiKey;
        ref.parentNode.insertBefore(script, ref);
        script.onload = function load() {
            this.remove();
        };
    }

    fetchMap();
}

export default class MapView extends React.Component {
    componentDidMount() {
        createMap([]);
    }

    componentWillReceiveProps(nextProps) {
        createMap(nextProps.color);
    }

    render() {
        return (
            <div id="map" />
        );
    }
}

