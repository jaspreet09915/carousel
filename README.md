# Carousel
This is a React carousel that works using touch, keyboard, and swipes.
This is a work in progress and it will be updated with time.

## Features
The carousel would display its children each on a slide.
It supports for now clicking the controls to move between slides. It also supports keyboard navigation and finger following swipes.
You can preview the carousel on https://judabne-react-carousel.web.app/.

You can add a infinite to the carousel to make it scroll continously, it would scroll back to the first slide after it reaches the end
```<Carousel infinite>```

This repository also includes a working example, similar to the one shown in the link above.
You can download/clone this repository and set the project up using ```npm install```.

# Installation and Setup
This project was created using Webpack and npm.

You can add the component manually to your react project by downloading the ```carousel/src/components/Carousel/``` from this repository.
You get access to the code and you can modify it accordingly.

Moreover, if you want to start a new React project with the carousel component in it, you can just clone this repository and then run ```npm install```.
You will start with a new project with a demo Carousel in it. You can also use this setup to just run the example as well. 
_In case you go with this option, the project is set to run on localhost:8080_

This package can be installed in your project using ```npm install judabne-react-carousel```.
In case you are using CSS modules in react (v16.8+ - if you haven't manually set the css-loader - e.g you used ```create-react-app```)
you can proceed by renaming the Carousel.css file to Carousel.module.css (do not forget to change the import in Carousel.js to "Carousel.module.css" as well).

# Proposed updates
There CarouselSuggestions file in the ```carousel/src/components/Carousel/``` folder contains some proposed JS code.
This code will be ameliorated in the future to add features to the carousel.
Below you will find features that I plan to add in the future.

* Timer: The timer is supposed to move to the next slide in the carousel. Its code is working, yet it needs to be reset on click, swipe, and keyboard input.
* Timer interval: Set a given time interval for the timer
* Pausing timer: After the timer is added, I plan to add an option to manually pause the timer.
* Multislide display

