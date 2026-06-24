import React from 'react'
import { useSelector } from 'react-redux'
import '../../style/profile.css'

const Profile = () => {

  const { user } = useSelector(state => state.user)

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0)}
          </div>

          <h2>
            {user?.name} {user?.last_name}
          </h2>

          <p>{user?.email}</p>
        </div>

        <div className="profile-info">

          <div className="info-box">
            <span>First Name</span>
            <h3>{user?.name}</h3>
          </div>

          <div className="info-box">
            <span>Last Name</span>
            <h3>{user?.last_name}</h3>
          </div>

          <div className="info-box">
            <span>Email</span>
            <h3>{user?.email}</h3>
          </div>

          <div className="info-box">
            <span>Passport Number</span>
            <h3>{user?.NP}</h3>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile