import React, { useState } from 'react'

export default function PasswordReset() {
  const [form,setForm] =useState({
    new:"",
    confirm:""
  })
  const handleChange = (e)=>{
    const {name,value}= e.target;
    setForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    alert("Password changed successfully")
  }
  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form onSubmit={handleSubmit} className="form p-5 rounded-4">
          <p className='text-center'>Enter New and Confirm Password</p>
          <hr />
          <input onChange={handleChange} value={form.new} className="form-control" type="password" name="new" id="" placeholder="Enter Password"/>
          <br />
          <input onChange={handleChange} value={form.confirm} className="form-control" type="password" name="confirm" id="" placeholder="Confirm Password"/>
          <br />
          <button type='submit' className='btn btn-lg btn-outline-success active w-100'>Submit</button>
        </form>
      </div>
  )
}
