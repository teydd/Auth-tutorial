import React from 'react'

export default function Signup() {
  return (
    <>
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form className="form p-5 rounded-4">
          <p className='text-center'>Sign up and have an account</p><hr />
          <input className="form-control" type="email" name="" id="" placeholder="Email Address"/>
          <br />
          <input className="form-control" type="email" name="" id="" placeholder="Name"/>
          <br />
          <input className="form-control" type="email" name="" id="" placeholder="Phone number"/>
          <br />
          <input className="form-control" type="password" name="" id="" placeholder="Enter Password"/>
          <br />
          <button className='btn btn-lg btn-outline-success active w-100'>Sign up</button><hr />
          <p>Already have an account <a href="/signin">Signin</a></p>
        </form>
      </div>
    </>
  )
}
