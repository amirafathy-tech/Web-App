
import style from './Homepage.module.css'
import video from '../../images/bg-video.mp4'
//import BoxScene from "../../threejs/myapp"
import BoxScene from "../../threejs/model"
export default function Homepage(props) {

    return (
        <>
            <div className={` row text-center ${style.header} `}>
               <h2 className='text-center'>Use the + or the - keys to zoom and the arrow keys to move</h2>
            </div>

            <div className={`row ${style.viewer}`}>
                {
                    <BoxScene />
                }
            </div>

            {/* <div id="carouselExampleAutoplaying" className= { ` carousel slide `} data-bs-ride="carousel">

                <div className= { `carousel-inner `}>

                    <div className={ `carousel-inner carousel-item vh-100 active ${style.slide1}`} >

                    </div>
                    <div className= { `carousel-inner  carousel-item vh-100 ${style.slide2}`}>

                    </div>
                    <div className={ `carousel-inner carousel-item vh-100 ${style.slide3}`}>

                    </div>

                </div>

            </div> */}


            {/* 
    <video src={video} autoplay muted loop></video> */}



        </>
    )

}