import React, { useState, useEffect } from 'react';
import classes from './Carousel.css';

const widthSpan = 100.1; //there is a 1% margin between elements - 101% to account for the margin right

function carousel(props) {
    // displayed slide
    const [sliderPosition, setSliderPosition] = useState(0);
    // touch state
    const [touchStartPosition, setTouchStartPosition] = useState(0);
    const [touchEndPosition, setTouchEndPosition] = useState(0);
    const [touched, setTouched] = useState(false);
    const [swiped, setSwiped] = useState(false);
    // mouse state
    const [mouseStartPosition, setMouseStartPosition] = useState(0);
    const [mouseEndPosition, setMouseEndPosition] = useState(0);
    const [mouseClicked, setMouseClicked] = useState(false);
    const [mouseSwiped, setMouseSwiped] = useState(false);
    // destructuring props
    const { children, infinite, timer, stopOnManual } = props;

    const [autoAdvance, setAutoAdvance] = useState(timer != undefined)
    let interval;

    //Handlers to move to the next and previous slides
    const prevSlideHandler = () => {
        //console.log("previous slide");
        let newPosition = sliderPosition;
        if (newPosition > 0) {
            newPosition = newPosition - 1;
        } else if (infinite) {
            // console.log('infinity!')
            newPosition = children.length - 1;
        } //with the new way to handle swipes, we can remove the return from the last else which handles infinite disabled
        translateFullSlides(newPosition);
        setSliderPosition(newPosition);
    }

    const nextSlideHandler = () => {
        // console.log("next slide")
        let newPosition = sliderPosition;
        if (newPosition < children.length - 1) {
            newPosition = newPosition + 1;
        } else if (infinite) {
            //console.log('infinity!')
            newPosition = 0;
        }
        translateFullSlides(newPosition);
        setSliderPosition(newPosition);
    }

    const manageTimer = () => {
        if(stopOnManual) {
            setAutoAdvance(false);
            clearInterval(interval);
        } else {
            // even though the timer is cleared, useEffect will set it again
            clearInterval(interval);
        }
    }

    const nextClickHandler = () => {
        manageTimer();
        nextSlideHandler();
    }

    const prevClickHandler = () => {
        manageTimer();
        prevSlideHandler();
    }

    //Handler to jump to a specific slide
    const jumpToSlideHandler = (id) => {
        //console.log("jump to slide " + id)
        manageTimer();
        let toTranslate = (id);
        translateFullSlides(toTranslate);
        setSliderPosition(id);
    }

    // Translating slides fully or partially
    const translateFullSlides = (newPosition) => {
        let toTranslate = -widthSpan * newPosition
        //console.log("translating " + toTranslate + "%")
        for (var i = 0; i < children.length; i++) {
            let elem = document.getElementById(`carouselitem` + i);
            elem.classList.add(classes.SlowAnimation);
            elem.style.transform = `translateX(` + toTranslate + `%)`; //translated on X axis as before. Used % instead of px.
            setTimeout(function () {
                elem.classList.remove(classes.SlowAnimation);
            }, 500) //give the transition time to finish before removing the class
            // I think this is better than a transition listener since we know the duration
        }
    }

    // Used for finger or mouse swipes before the user completes the action
    const translatePartialSlides = (toTranslate) => {
        let currentTranslation = -sliderPosition * widthSpan;
        let totalTranslation = currentTranslation + toTranslate;
        for (var i = 0; i < children.length; i++) {
            let elem = document.getElementById(`carouselitem` + i);
            elem.style.transform = `translateX(` + totalTranslation + `%)`;
        }
    }

    // Handling Keyboard
    const keyPressHandler = (event) => {
        manageTimer();
        //Arrow Navigation
        if (event.key === "ArrowLeft") {
            // console.log("left pressed")
            event.preventDefault();
            event.stopPropagation(); //does not affect parent 
            prevSlideHandler();
            return // do not continue to the other checks
        }
        if (event.key === "ArrowRight") {
            // console.log("right pressed");
            event.preventDefault();
            event.stopPropagation();
            nextSlideHandler();
            return
        }
        // Number navigation
        if (49 <= event.keyCode && event.keyCode <= 57) {
            //pressing between 1 and 9 to navigate first 9 elements
            const arrayPos = event.keyCode - 49;
            //pressing one jumps to first child
            //console.log("number pressed: " + event.keyCode + "... corresponding to " + (event.keyCode - 49));
            if (arrayPos <= children.length) {
                jumpToSlideHandler(arrayPos);
            }
            return
        }
        // pressing 0 goes to 9th element (0-index)
        if (event.keyCode === 48) {
            if (children.length >= 10)
                jumpToSlideHandler(9);
        }
    }

    // Handling Touches
    const touchStartHandler = (e) => {
        manageTimer();
        // console.log('touchstart')
        setTouchStartPosition(e.targetTouches[0].clientX);
        setTouchEndPosition(e.targetTouches[0].clientX);
        //it is cruicial to setTouchEndPosition before moving to touchMoveHandler
        //otherwise under extreme testing the slide might jump in an undesired direction if swipes or on different sides of the screen
        setTouched(true);
    }

    const touchMoveHandler = (e) => {
        // console.log('touchmove')
        setTouchEndPosition(e.targetTouches[0].clientX);
        var frameWidth = document.getElementById('DisplayFrame').offsetWidth;
        let translateDist = (touchEndPosition - touchStartPosition) / frameWidth * 100;
        translatePartialSlides(translateDist);
        if (touched === true) {
            setSwiped(true);
        }
    }

    const touchEndHandler = (e) => {
        e.preventDefault
        if (swiped) { //without this condition, tapping might result in random slide swipes
            //left swipe
            if (touchStartPosition - touchEndPosition > 75) {
                // console.log('touchend left swipe');
                nextSlideHandler();
            }
            //right swipe
            else if (touchStartPosition - touchEndPosition < -75) {
                // console.log('touchend right swipe');
                prevSlideHandler();
            } else {
                //swipe cancelled
                jumpToSlideHandler(sliderPosition);
            }
        }
        setTouched(false);
        setSwiped(false);
    }

    // Handling Mouse swipes
    const mouseStartHandler = (e) => {
        manageTimer();
        e.preventDefault();
        //console.log('mousestart ' + e.clientX);
        setMouseStartPosition(e.clientX);
        setMouseEndPosition(e.clientX);
        //similar to touch handlers we set the setMouseEndPosition at this point
        //otherwise under extreme testing the slide might show a short jump in an undesired direction if swipes or on different sides of the screen
        setMouseClicked(true);
    }

    const mouseMoveHandler = (e) => {
        e.preventDefault();
        var frameWidth = document.getElementById('DisplayFrame').offsetWidth;
        //doing this to keep working in %
        if (mouseClicked === true) {
            setMouseEndPosition(e.clientX);
            let translateDist = (mouseEndPosition - mouseStartPosition) / frameWidth * 100;
            translatePartialSlides(translateDist);
            setMouseSwiped(true);
        }
    }

    const mouseEndHandler = () => {
        // console.log('mouse end');
        if (mouseSwiped === true) { //prevent undesired slide changes if a click without moving was registered
            //left swipe
            if (mouseStartPosition - mouseEndPosition > 100) {
                // console.log('mouseend left swipe');
                nextSlideHandler();
            }
            //right swipe
            else if (mouseStartPosition - mouseEndPosition < -100) {
                // console.log('mouseend right swipe');
                prevSlideHandler();
            }
            //no swipe
            else {
                jumpToSlideHandler(sliderPosition);
            }
        }
        setMouseClicked(false);
        setMouseSwiped(false);
    }

    const wheelHandler = () => {
        //this handler specifically targets horizontal-scrolling with a laptop touchpad
        //disable scrolling to prevent ruining the view
        document.getElementById("DisplayFrame").scrollLeft = 0;
    }

    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);
        
        //console.log(autoAdvance)
        if (timer != undefined && autoAdvance) {
            interval = setInterval(() => {
                console.log("interval " + sliderPosition)
                nextSlideHandler();
            }, timer);
        }
        // cleanup
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
            clearInterval(interval);
        };
    });

    return (
        <div>
            <div className={classes.Container}>
                <div className={classes.LeftArrow} onClick={prevClickHandler}>❰</div>
                <div
                    className={classes.DisplayFrame}
                    id="DisplayFrame"
                    onTouchStart={(e) => touchStartHandler(e)}
                    onTouchMove={(e) => touchMoveHandler(e)}
                    onTouchEnd={(e) => touchEndHandler(e)}
                    onMouseDown={(e) => mouseStartHandler(e)}
                    onMouseMove={(e) => mouseMoveHandler(e)}
                    onMouseUp={() => mouseEndHandler()}
                    onMouseLeave={() => mouseEndHandler()}
                    //without onMouseLeave we might face a problem
                    //onMouseLeave is better than onMouseOut if we have elements that do not occupy the full width
                    onWheel={() => wheelHandler()}
                >
                    {children.map((child, index) => (
                        <div className={classes.CarouselItem} id={`carouselitem` + index} key={index}>{children[index]}</div>
                    ))}
                </div>
                <div className={classes.RightArrow} onClick={nextClickHandler}>❱</div>
            </div>

            <div className={classes.Navigation}>
                {children.map((child, index) => (
                    <div
                        className={sliderPosition === index
                            ? classes.PositionIndicator.concat(' ' + classes.CurrentPosition)
                            : classes.PositionIndicator}
                        key={index}
                        onClick={() => jumpToSlideHandler(index)}
                    >
                    </div>
                )
                )}
            </div>
        </div>
    );
}

//created by judabne - https://github.com/judabne
export default carousel;