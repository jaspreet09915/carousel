import React, {Component} from 'react';
import classes from './Carousel.css';


class Carousel extends Component {
    state = {
        sliderPosition: 0,
        touchStartPosition: 0,
        touchEndPosition: 0,
    }

    componentDidMount() {
        console.log("mounted")
        document.addEventListener('keydown', this.keyPressHandler)
    }
    
    //Handlers to move to the next and previous slides
    prevSlideHandler = () => {
        
        console.log("previous slide")
        let newPosition = this.state.sliderPosition;
        if (newPosition > 0){
            newPosition =  newPosition - 1 ;
        } else if (this.props.infinite) {
            console.log('infinity!!!!')
            newPosition = this.props.children.length - 1;
        }  else {
            return
        }
        const divToScrollTo = document.getElementById(`carouselitem` + newPosition);
        if (divToScrollTo) {
            divToScrollTo.scrollIntoView({ behavior: 'smooth' });
        }
        this.setState({ sliderPosition: newPosition}) //did this since updating state is async, leades to problems in scrolling
        return;
    }
    nextSlideHandler = () => {

        console.log("next slide")
        console.log('old position: ' + this.state.sliderPosition)
        let newPosition = this.state.sliderPosition;
        if (newPosition < this.props.children.length - 1){
            newPosition = newPosition + 1;
            console.log('increased position: ' + this.state.sliderPosition)
        } else if (this.props.infinite) {
            console.log('infinity!!!!')
            newPosition = 0
        } else {
            return //without this return, if inifinite scrolling is disabled we might see 2 elements overlap (in case one didn't occupy full width)
        }
        const divToScrollTo = document.getElementById(`carouselitem` + newPosition);
        if (divToScrollTo) {
            // setTimeout(elem.setAttribute("style","overflow-x: auto;"), 1000)
            divToScrollTo.scrollIntoView({ behavior: 'smooth' });
        }
        this.setState({ sliderPosition: newPosition}) 
        
    }

    //Handler to jump to a specific slide
    jumpToSlideHandler = (id) => {
        console.log("jump to slide " + id)
        const divToScrollTo = document.getElementById(`carouselitem` + id);
        console.log(divToScrollTo)
        if (divToScrollTo) {
            divToScrollTo.scrollIntoView({ behavior: 'smooth' });
        }
        this.setState({sliderPosition: id})
    }

    keyPressHandler = (event) => {
        console.log("key pressed " + event)
        if (event.key === "ArrowLeft"){
            console.log("left pressed")
            event.preventDefault();
            event.stopPropagation(); //does not affect parent 
            this.prevSlideHandler();
        }
        if (event.key === "ArrowRight"){
            //could've added response to space as well. But it will make it impossible to type if we have input in casourel!
            console.log("right pressed");
            event.preventDefault();
            event.stopPropagation();
            this.nextSlideHandler();
        }
    }

    touchStartHandler = (e) => {
        console.log('touchstart')
        this.setState({touchStartPosition: e.targetTouches[0].clientX})
    }

    touchMoveHandler = (e) => {
        console.log('touchmove')
        this.setState({touchEndPosition: e.targetTouches[0].clientX})
        let elem = document.getElementById(`carouselitem` + this.state.sliderPosition)
        let translateDist = this.state.touchEndPosition - this.state.touchStartPosition
        console.log("moving: " + translateDist  + " px")
        elem.setAttribute("style", `transform: translate(`+translateDist+`px)`)
    }
    
    touchEndHandler = (e) => {
        //we set the element that we want to return to its position before changing the sliderPosition
        let elem = document.getElementById(`carouselitem` + this.state.sliderPosition)
        elem.style.transitionDuration = 2;
        console.log(elem)
        // elem.setAttribute("style", `transition-duration: ` + Math.abs(this.state.touchEndPosition - this.state.touchStartPosition)/1000 + `s ease-out`)
        elem.setAttribute("style", `transform: translate(`+ this.state.touchStartPosition - this.state.touchEndPosition +`px);`)
        console.log(elem)
        //left swipe
        if (this.state.touchStartPosition - this.state.touchEndPosition > 100) {
            console.log('touchend left swipe');
            this.nextSlideHandler()
        }
        //right swipe
        else if (this.state.touchStartPosition - this.state.touchEndPosition < -100) {
            console.log('touchend right swipe');
            this.prevSlideHandler()
        }
        // Initially had a case for swipe cancelled. But our algorithm can do without it now
    }

    render () {
        console.log("current position: " + this.state.sliderPosition)
        return (
            <div>
                <div className={classes.container} >
                    <div className={classes.LeftArrow} onClick={this.prevSlideHandler}>❰</div>
                    <div key={this.state.Displaykey}
                        className={classes.DisplayFrame} 
                        id="DisplayFrame" 
                        onTouchStart={(e) => this.touchStartHandler(e)}
                        onTouchMove={(e) => this.touchMoveHandler(e)}
                        onTouchEnd={(e) =>  this.touchEndHandler(e)}
                    >
                        {/* <div id="DisplayFilm" className={classes.DisplayFilm}> */}
                            {this.props.children.map((child, index) => (
                                <div className={classes.CarouselItem} id={`carouselitem` + index} key={index}>{this.props.children[index]}</div>
                            ))}
                        {/* </div> */}
                        
                    </div>
                    <div className={classes.RightArrow} onClick={this.nextSlideHandler}>❱</div>
                </div>

                <div className={classes.Navigation}>
                    {this.props.children.map((child, index) => (
                            <div 
                                className={this.state.sliderPosition === index 
                                    ? classes.PositionIndicator.concat(' '+ classes.CurrentPosition) 
                                    : classes.PositionIndicator} 
                                key={index}
                                onClick = {() => this.jumpToSlideHandler(index)}
                                >    
                                {console.log(index)}
                            </div>
                        )
                    )}
                </div>
            </div>       
        );
    }
}

export default Carousel;