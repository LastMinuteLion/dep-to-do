import ListHeader from "./components/ListHeader";
import {useEffect, useState} from 'react'
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";



const  App = () => {
  const [cookies ,setCookie ,removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const[tasks , setTasks] = useState(null)

  

  const getData = async () => {
    
    try{
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)

    const json = await response.json()
    //console.log(json);
    setTasks(json)
    }catch(err){
      console.error(err)
    }
  }

 useEffect( () => {
  if(authToken) {
    getData()
  }
 },[])

 console.log(tasks);
 
//sort by date
const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))



  return (
    <div className="app">


      {!authToken && <Auth/>}
    

       
       {authToken &&
       <div>
       <ListHeader listName = {'🏝️ Holiday tick list'} getData={getData}/>
       <p className="user-email">  Welcome back {userEmail}</p>
       {sortedTasks?.map((task) => <ListItem key = {task.id} task = {task} getData={getData}/>)}
       </div>}
       <p className="copyright"> Creative Coding</p>
       
    </div>
  )
}

export default App;
