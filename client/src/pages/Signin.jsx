import React from 'react'

export default function Signin() {
  return (
    <>
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form className="form p-5 rounded-4">
          <input className="form-control" type="email" name="" id="" placeholder="Email Address"/>
          <br />
          <input className="form-control" type="password" name="" id="" placeholder="Enter Password"/>
          <br />
          <a href="/forgot-password"><i>Forgot Password?</i></a>
          <button className='btn btn-lg btn-outline-success'>Submit</button>
        </form>
      </div>
    </>
  )
}
