import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = (props) => {
  return (
    <section className="page_404">
      <div className="main">
        <h1>404</h1>
        {/* <img src="https://image.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=1380" alt="404 image" /> */}
        <div className="four_zero_four_bg">
        </div>
        <div className="contant_box_404">
          <h3>Look like you're lost</h3>
          <p>the page you are looking for not avaible!</p>
          <Button variant="info" onClick={() => props.history.push("/")}>Go Home</Button>{' '}
          <Button variant="primary" onClick={() => props.history.goBack()}>Go Back</Button>{' '}
        </div>
      </div>
    </section>
  )
}
export default NotFound