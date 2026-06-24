import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../style/setting.css'
import { up_user } from '../../redux/reducer/user/user_reducer'

const Setting = () => {

  const { user, error } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    NP: ""
  })

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    privacy: false
  })

  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        NP: user.NP || ""
      })
    }
  }, [user])

  
  useEffect(() => {
    const saved = localStorage.getItem("settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))

    // DARK MODE 
    if (settings.darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }

  }, [settings])

  
  const handleChange = (e) => {
    setSuccess(false)

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleToggle = (e) => {
    setSettings({
      ...settings,[e.target.name]: e.target.checked
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(up_user(formData))
      .unwrap()
      .then(() => {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      })
      .catch(() => {
        setSuccess(false)
      })
  }

  return (
    <div className="setting-page">

      <form className="setting-card" onSubmit={handleSubmit}>

        <h1>Settings</h1>

        {/* DARK MODE */}
        <div className="setting-item">
          <div>
            <h3>Dark Mode</h3>
            <p>Enable dark theme interface</p>
          </div>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleToggle}
          />
        </div>

        {/* NOTIFICATIONS */}
        <div className="setting-item">
          <div>
            <h3>Email Notifications</h3>
            <p>Receive updates by email</p>
          </div>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleToggle}
          />
        </div>


        <div className="setting-item">
          <div>
            <h3>Privacy Mode</h3>
            <p>Hide sensitive information</p>
          </div>
          <input
            type="checkbox"
            name="privacy"
            checked={settings.privacy}
            onChange={handleToggle}
          />
        </div>

        <h2 style={{ marginTop: "25px", marginBottom: "15px" }}>
          Update Information
        </h2>

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Passport Number</label>
          <input
            type="text"
            name="NP"
            value={formData.NP}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>

        {error && (<p style={{ color: "red" }}>Update failed: {error}</p>)}
        {success && (<p style={{ color: "green" }}>Profile updated successfully</p>)}
      </form>
    </div>
  )
}

export default Setting