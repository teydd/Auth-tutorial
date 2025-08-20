import React from 'react'

export default function Signin() {
  return (
    <>
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form className="form p-5 rounded-4">
          <input className="form-control" type="email" name="" id="" placeholder="Email Address"/>
          <br />
          <input className="form-control mb-3" type="password" name="" id="" placeholder="Enter Password"/>
          <a href="/forgot-password" className='nav-link'><i>Forgot Password?</i></a><hr />
          <button className='btn  btn-outline-success active  w-100'>Submit</button>
        </form>
      </div>
    </>
  )
}
