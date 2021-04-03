import React, { Component } from 'react';
import SwipeControl from './components/Swipe/Swipe';
import CarouselContainer from './containers/CarouselContainer'

class App extends Component {
    render () {
        return (
            <div>
                App.js loaded
                <CarouselContainer />
            </div>
        );
    }
}

export default App;