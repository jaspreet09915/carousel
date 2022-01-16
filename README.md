# Carousel
This is a React carousel that works using touch, keyboard, and swipes.
This is a work in progress and it will be updated with time.
The features of this carousel were tested on Chrome desktop, Edge for Windows, Chrome for Android, Opera for Android, and Firefox for Android.

![carousel preview](carousel-preview.gif)

## Features
The carousel would display its children each on a slide.
It supports for now clicking the controls to move between slides. It also supports keyboard navigation and finger following swipes.
You can preview the carousel on https://judabne-react-carousel.web.app/.

You can add a infinite to the carousel to make it scroll continously, it would scroll back to the first slide after it reaches the end.
```<Carousel infinite>```

This repository also includes a working example, similar to the one shown in the link above.
You can download/clone this repository and set the project up using ```npm install``` . _See the Fresh Setup section below._

## Modifications
* Removed the resize-handler. Since the carousel was updated to use transitions, the resize handler became insignificant.
* Added the ability to navigate with they keyboard number row. 1 goes to the first element, 0 goes to the tenth.
* Fixed the a short undesired jump when swiping on alternating sides of the screen.
* Added the ability to add a timer so that slides autoadvance. This is passed through props (e.g timer={2000})
* Added the option to cancel the timer after detecting manual input. This is passed through props

# Installation and Setup
This project was created using Webpack and npm.

You can add the component manually to your react project by downloading the ```carousel/src/components/Carousel/``` from this repository.
You get access to the code and you can modify it accordingly.

## Fresh Setup
Moreover, if you want to start a new React project with the carousel component in it, you can just clone this repository and then run ```npm install```.
You will start with a new project with a demo Carousel in it. You can also use this setup to just run the example as well. 
_In case you go with this option, you can ```cd``` to your project's directory, and type ```npm start```. The project is set to run on ```localhost:8080```_

# Proposed updates
There CarouselSuggestions file in the ```carousel/src/components/Carousel/``` folder contains some proposed JS code.
This code will be ameliorated in the future to add features to the carousel.
Below you will find features that I plan to add in the future.

* Pausing timer: After the timer is added, I plan to add an option to manually pause the timer.
* Multislide display

