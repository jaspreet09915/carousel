import React from 'react';
import classes from './Swipe.css'

const swipeControl = (props) => {
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    
    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
        console.log('touch start');
    }
    
    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX);
        console.log('touch move');
    }
    
    function handleTouchEnd() {
        //left swipe
        if (touchStart - touchEnd > 70) {
            console.log('left swipe');
            props.onLeftSwipe
        }
        //right swipe
        else if (touchStart - touchEnd < -70) {
            console.log('right swipe');
            props.onRightSwipe
        }
        else {
            console.log('swipe canceled')
            props.onCancelSwipe
        }
    }

    return(
        props.children
    
    )
    
};

export default swipeControl