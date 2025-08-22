import React, { useState } from 'react'

export default function Signup() {
  const [form,setForm] = useState({
    email:"",
    name:"",
    tel:"",
    password:""
  })
  const handleOnchange = (e)=>{
    const {name,value}= e.target;
    setForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <>
    <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form onSubmit={handleSubmit} className="form p-5 rounded-4">
          <p className='text-center'>Sign up and have an account</p><hr />
          <input onChange={handleOnchange} value={form.email} className="form-control" type="email" name="email" id="" placeholder="Email Address"/>
          <br />
          <input onChange={handleOnchange} value={form.name} className="form-control" type="name" name="name" id="" placeholder="Name"/>
          <br />
          <input onChange={handleOnchange} value={form.tel} className="form-control" type="tel" name="tel" id="" placeholder="Phone number"/>
          <br />
          <input onChange={handleOnchange} value={form.password} className="form-control" type="password" name="password" id="" placeholder="Enter Password"/>
          <br />
          <button type='submit' className='btn btn-lg btn-outline-success active w-100'>Sign up</button><hr />
          <p>Already have an account <a href="/signin">Signin</a></p>
        </form>
      </div>
    </>
  )
}
