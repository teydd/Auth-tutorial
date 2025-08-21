import React from 'react'

export default function PasswordReset() {
  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form className="form p-5 rounded-4">
          <p className='text-center'>Enter New and Confirm Password</p>
          <hr />
          <input className="form-control" type="password" name="" id="" placeholder="Enter Password"/>
          <br />
          <input className="form-control" type="password" name="" id="" placeholder="Confirm Password"/>
          <br />
          <button className='btn btn-lg btn-outline-success active w-100'>Submit</button>
        </form>
      </div>
  )
}
