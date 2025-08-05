import Footer from '@/Components/Footer'
import Page from '@/Components/layout/Page'
import Navbar from '@/Components/NavBar'
import React from 'react'

function GetStarted() {
  return (
    <>
      <Page>
        <div>
          <h1>Get Started</h1>
          <form>
            <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
            </div>
            <div>
          <label htmlFor="organization">Organization:</label>
          <input type="text" id="organization" name="organization" required />
            </div>
            <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
            </div>
            <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
            </div>
            <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </Page>
    </>
  )
}

export default GetStarted