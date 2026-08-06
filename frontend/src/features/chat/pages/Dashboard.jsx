import React , {useEffect} from 'react'
import {useSelector} from "react-redux"
import {useChat} from "../hooks/useChat.js"

const Dashboard = () => {
  const chat = useChat()
  const {user } = useSelector((state) => state.auth);

  console.log(user)

  useEffect(() => {
    chat.initializeSocket();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
    </div>
  )
}

export default Dashboard