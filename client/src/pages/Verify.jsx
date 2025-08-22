import React, { useState } from 'react'

export default function Verify() {
    const [code,setCode]= useState(["","","","","",""])
  return (
    <>
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form  className="form p-5 rounded-4">
          <label className='p-3' htmlFor="">Enter the 6 digit code sent to your email</label>
          <input className="form-control" type="email" name="email" id="" placeholder="Your Email Address"/>
          <br /><hr />
          <button type='submit' className='btn btn-lg btn-outline-success active w-100'>Submit</button>
        </form>
      </div>
    </>
  )
}
