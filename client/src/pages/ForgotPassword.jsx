import React from 'react'

export default function ForgotPassword() {
  return (
   <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form className="form p-5 rounded-4">
          <label className='p-3' htmlFor="">Enter email associated with the account</label>
          <input className="form-control" type="email" name="" id="" placeholder="Your Email Address"/>
          <br /><hr />
          <button className='btn btn-lg btn-outline-success active w-100'>Submit</button>
        </form>
      </div>
  )
}
