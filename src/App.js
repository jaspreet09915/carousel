import React from 'react';
import Carousel from './components/Carousel/Carousel'

function app() {
    return (
        <div>
            <h5 style={{textAlign: "center"}}>Carousel</h5>
            <Carousel infinite>
                <img src="https://images.unsplash.com/photo-1595835018349-198460e1d309?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="sample image"/>
                <img src="https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg" alt="sample image"/>
                <img src="https://i.pinimg.com/originals/7b/c1/24/7bc12410da0124244008b81c5f9e37ec.jpg" alt="sample image"/>
                <img src="https://www.online-tech-tips.com/wp-content/uploads/2016/03/widescreen-iphone-photo.jpg.optimal.jpg" alt="sample image"/>
                <img src="https://wallpaperaccess.com/full/25637.jpg" alt="sample image"/>
                <h1 style={{background: '#206ebd'}}>Sample h1</h1>
                <div style={{background: "#fe3465"}}><h2>Sample h2</h2><p>Text 1</p><p>Text 2</p><p>Text 3</p><p>Text 4</p><p>Text 5</p><p>Text 6</p></div>
                <h1>hey</h1>
                <input id="color_picker" type="color" style={{width: "80%", height: "50%", position: "relative", top: "25%"}}></input>
                <img src="https://www.w3schools.com/css/img_5terre_wide.jpg" alt="sample image" />
                <img src="https://wallpapercave.com/wp/wp2419380.jpg" alt="sample image" />
            </Carousel>
            
        </div>
    );
}

export default app;