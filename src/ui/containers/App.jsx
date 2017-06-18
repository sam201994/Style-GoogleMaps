import React from 'react';

import MapView from './MapView';
import getStyles from '../utils/styles';
import '../../assets/stylesheets/style.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: [],
        };
        this.setColorScheme = this.setColorScheme.bind(this);
    }

    setColorScheme(e) {
        const schemeName = e.target.name;
        const color = getStyles(schemeName);
        this.setState({ color });
    }

    render() {
        return (
            <div>
                <div id="mapContainer">
                    <MapView color={this.state.color} />
                </div>
                <div className="bar">
                    <div className="innerBar">
                        <button className="button_example2" name={'DARK'} onClick={this.setColorScheme} />
                        <button className="button_example1" name={'NIGHT_MODE'} onClick={this.setColorScheme} />
                        <button className="button_example3" name={'STANDARD'} onClick={this.setColorScheme} />

                    </div>
                </div>
            </div>

        );
    }
}
