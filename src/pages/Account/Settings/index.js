import React from 'react';
import { Profile, ChangePassword } from './components';
const Settings = () => {
  return (
    <div>
      <h1 className="padding-bottom-sm font-lg">Settings</h1>
      <Profile />
      <ChangePassword />
    </div>
  )
}

export default Settings;
