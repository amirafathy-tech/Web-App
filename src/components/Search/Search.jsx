

import React from "react"
import style from './Search.module.css'
export default function Search() {

    return (
        <>
            <div className="container">
                <h3 className={`my-3 ${style.formtitle} `}>Unit Search</h3>
                <div className="row ">
                    <div className="col-md-6 ">
                        <div class="input-group mb-3 d-block w-100">
                            <label htmlFor='Category' className={` ${style.inputtitle} `}> Category:</label>
                            <select class="form-select w-100" id="inputGroupSelect02">
                                <option selected></option>
                                <option value="1">category 1</option>
                                <option value="2">category 2</option>
                            </select>
                        </div>

                        <div className="input-group mb-3  flex flex-col ">
                            <label htmlFor='DeliveryDate' className={` ${style.inputtitle} `}>DeliveryDate:  </label>
                            <div className="flex">
                            <div className="flex">
                                <p>From</p>
                                <input type='date' className='form-control my-2' name='DeliveryDate' />
                            </div>

                            <div className="flex">
                                <p>To</p>
                                <input type='date' className='form-control my-2' name='DeliveryDate' />

                            </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor='Size' className={` ${style.inputtitle} `}>Size:  </label>

                            <p>From</p>
                            <input type='text' className='form-control my-2' name='Size' />

                            <p>To</p>
                            <input type='text' className='form-control my-2' name='Size' />
                        </div>

                        <div className="input-group mb-3">
                            <label htmlFor='Price' className={` ${style.inputtitle} `} >Price:  </label>
                            <p>From</p>
                            <input type='text' className='form-control my-2' name='Price' />

                            <p>To</p>
                            <input type='text' className='form-control my-2' name='Price' />
                        </div>


                    </div>
                    <div className="col-md-6 ">
                        <div class="input-group mb-3 d-block w-100">
                            <label htmlFor='Phase' className={` ${style.inputtitle} `}> Phase:</label>
                            <select class="form-select w-100" id="inputGroupSelect02">
                                <option selected></option>
                                <option value="1">category 1</option>
                                <option value="2">category 2</option>
                            </select>
                        </div>
                        <div class="input-group mb-3 d-block w-100">
                            <label htmlFor='Zone' className={` ${style.inputtitle} `}> Zone:</label>
                            <select class="form-select w-100" id="inputGroupSelect02">
                                <option selected></option>
                                <option value="1">category 1</option>
                                <option value="2">category 2</option>
                            </select>
                        </div>

                        <div class="input-group mb-3 d-block w-100">
                            <label htmlFor='Building' className={` ${style.inputtitle} `}> Building:</label>
                            <select class="form-select w-100" id="inputGroupSelect02">
                                <option selected></option>
                                <option value="1">category 1</option>
                                <option value="2">category 2</option>
                            </select>
                        </div>
                        <div class="input-group mb-3 d-block w-100">
                            <label htmlFor='Annex' className={` ${style.inputtitle} `}> Annex:</label>
                            <select class="form-select w-100" id="inputGroupSelect02">
                                <option selected></option>
                                <option value="1">category 1</option>
                                <option value="2">category 2</option>
                            </select>
                        </div>

                        <div class="input-group mb-3 d-block w-100">
                            <label htmlFor='Type' className={` ${style.inputtitle} `}> Type:</label>
                            <select class="form-select w-100" id="inputGroupSelect02">
                                <option selected></option>
                                <option value="1">category 1</option>
                                <option value="2">category 2</option>
                            </select>
                        </div>
                    </div>

                </div>


                <button className={` ${style.searchbutton} `} type="submit">Search</button>
            </div >

        </>
    )

}