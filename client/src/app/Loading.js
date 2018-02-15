import React from 'react';
import loading from '../img/loading.gif'
import Header from '../layout/Header'

const Loading = () => (
  <div>
    <Header/>
    <div style={LoadingWrapperStyle}>
      <img src={loading} style={LoadingStyle} alt="loading"/>
    </div>
  </div>
)

const LoadingWrapperStyle = {
  width: "30%",
  margin: "20.75vh auto 0",
}

const LoadingStyle = {
  width: "100%",
  padding: "0",
  margin: "6.75vh auto 0",
  background: "none",
  border: "none",
}

export default Loading