import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

export default function ProjectRequest({onClose,children}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !mobile || !message) {
      setError("همه فیلدها باید پر شود");
      return;
    }
    try {
        const res = await fetch("/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            mobile,
            message,
          }),
        });
        if (res.ok) {
          const form = e.target;
          form.reset();
          router.push("/");
        }
      } catch (error) {
        console.log("error", error);
      }
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="requests-body">
        <div className="requests-body-head">
          <h2>درخواست پروژه</h2>
          <RiCloseLargeFill onClick={()=>onClose()} />
        </div>
        <form className="requests-body-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>نام کاربری</label>
            <input onChange={(e)=>setUsername(e.target.value)} type="text" className="username" id="username" />
          </div>
          <div className="input-group">
            <label>پست الکترونیک</label>
            <input onChange={(e)=>setEmail(e.target.value)} type="text" className="email" id="email" />
          </div>
          <div className="input-group">
            <label>شماره تماس</label>
            <input onChange={(e)=>setMobile(e.target.value)} type="text" className="mobile" id="mobile" />
          </div>
          <div className="input-group">
            <label>پیام یا تقاضا</label>
            <textarea onChange={(e)=>setMessage(e.target.value)} name="" rows="10" cols="8" id=""></textarea>
          </div>
          <button type="submit" className="request-btn">ثبت درخواست</button>
        </form>
      </div>
    </>
  );
}
