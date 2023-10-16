
import style from './About.module.css'
import compound1 from '../../images/compound1.jpg'
import compound2 from '../../images/compound2.jpg'
export default function About() {

    return (
        <>

            <div className="about my-5 py-5" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 order-sm-2 order-lg-2 ">
                            <div className="h-100 ">
                                <img src={compound1} className="w-100 h-100 rounded-5 img-fluid" alt=""></img>
                            </div>
                        </div>
                        <div className="col-lg-4  mb-sm-5 col-sm-12 order-sm-1 order-lg-2">
                            <div className="about2 text-center ">
                                <h2 className={`${style.maincolor} fw-bold display-5 mt-5 mb-4`}>About us</h2>
                                <h2 className="fw-bold display-6 sec-color mt-2 text-white ">Welcome to <span className={`${style.maincolor}`}>Compound Development</span></h2>
                                <p className="mb-5 text-white">We Provide Best Compound Packages In Your Budget!</p>
                                <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio maxime voluptatibus impedit eaque
                                    perferendis omnis incidunt dolorum corporis voluptatem, alias hic dicta libero veritatis rerum praesentium
                                    similique at itaque?</p>
                                {/* <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio maxime voluptatibus impedit eaque
                                    perferendis omnis incidunt dolorum corporis voluptatem, alias hic dicta libero veritatis rerum praesentium
                                    similique.</p> */}
                                    
                                {/* <button className="about-btn bg-main-color text-white border-0 px-4 fw-bold py-2 mt-3 text-uppercase tran">Book
                                    now</button> */}

                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 order-sm-3 order-lg-3">
                            <div className=" h-100  ">
                                <img src={compound2} className="w-100 h-100 rounded-5 img-fluid" alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )

}