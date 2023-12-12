import axios from "axios";
import tune from "../Resources/tone.mp3"
import { Route, Switch, useHistory } from "react-router-dom";
import RenderChat from "./RenderChat";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../methods/socket";
import { visibleToast } from "../methods/visibleToast";
import { useRouteMatch } from "react-router-dom";
import React from "react";



const Mobile = () => {

  let history = useHistory();

  let date = new Date();

  const match = useRouteMatch();

  const stateEmail = useSelector((state)=>state.emailReducer);
  const remail = useSelector((state)=>state.remailReducer);
  const stateName = useSelector((state)=>state.nameReducer);
  const stateFriends = useSelector((state)=>state.friendsReducer)
  const count = useSelector((state)=>state.countReducer);
  const chat = useSelector((state)=>state.chatReducer);
  const stateRname = useSelector((state)=>state.rnameReducer);
  const dispatch = useDispatch()
  const {setCount,setChat,setFriends,setRemail,setRname,setToast,setProgress}=bindActionCreators(actionCreators,dispatch)

  setProgress(75)
  const updateFriends = async () => {
    try {
      if (stateEmail != "") {
        let res = await axios.post("http://127.0.0.1:5000/getfriends", {
          email: stateEmail,
        });
        
        setFriends(res.data);
      } else {
        history.push("/");
      }
    } catch (err) {
      setToast(err.message);
      visibleToast();
      setTimeout(() => {
        document.getElementById("toast").style.display = "none";
      }, 2000);
    }
  };

  React.useEffect(async () => {
    
    updateFriends();
  }, [count]);

  React.useEffect(()=>{
    setProgress(100)
  },[])
  socket.off('receiveMessage').on('receiveMessage',async(smail,message)=>{
      
      let audio = new Audio(tune)
      audio.play();

      let chatData = {
        sender:"you",
        message:message
      }
      if(smail === remail){
      let temp = [...chat,chatData]
        await setChat(temp)
        await changeCount(smail,0);
      }
      else
      {
        await changeCount(smail,1);
      }
    
})
  

  React.useEffect(async () => {
    if(window.location.pathname === '/main/chat')
    scrollBottom();
  }, [chat]);



  const nameClick = async (email, name) => {
    try {
      
      active(name+email);
      setProgress(80)
      
      let res = await axios.post("http://127.0.0.1:5000/getchat", {
        email: stateEmail,
        remail: email,
      });
      
      if (res.status === 200) {
        history.push(`${match.path}/chat`)
        await setProgress(100);
        await changeCount(email, 0);
        await setRemail(email);
        await setRname(name);
        document.querySelector(".chat-container").style.display = "block";
        document.getElementById("chatHead").style.display = "block";
        await setChat(res.data.chat.data);
      } else throw new Error(res.data);
    } catch (err) {
      setToast(err.message);
      visibleToast();
      setTimeout(() => {
        document.getElementById("toast").style.display = "none";
      }, 2000);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let remail = e.target.querySelector("#addfriend-input").value;
      e.target.querySelector("#addfriend-input").value = "";
      let res = await axios.post("http://127.0.0.1:5000/addfriend", {
        email: stateEmail,
        remail: remail,
        name: stateName,
      });

      if (res.status === 200) updateFriends();
      else throw new Error(res.data);
    } catch (err) {
      setToast(err.message);
      visibleToast()
      setTimeout(() => {
        document.getElementById("toast").style.display = "none";
      }, 2000);
    }
  };

  const sendMessage = async(e) => {
    try {
      e.preventDefault();
      let message = document.getElementById("sendMessage-input").value;
      document.getElementById("sendMessage-input").value = "";
      
      let key1 = date.getTime();

      socket.emit("sendMessage", stateEmail, remail, message,key1);

      let chatData = {
        sender:"me",
        message:message
      }
      let temp = [...chat,chatData]
      setChat(temp)
    } catch (err) {
      setToast(err.message);
      visibleToast();
      setTimeout(() => {
        document.getElementById("toast").style.display = "none";
      }, 2000);
    }
  };

  // const getchat = async () => {
  //   try {
  //     let res = await axios.post("http://127.0.0.1:5000/getchat", {
  //       email: state.email,
  //       remail: state.remail,
  //     });
  //     if (res.status === 200) {
  //       setchat(res.data.chat.data);
  //       scrollBottom();
  //     } else throw new Error(res.data);
  //   } catch (err) {
  //     setToast(err.message);
  //     setTimeout(() => {
  //       document.getElementById("toast").style.display = "none";
  //     }, 2000);
  //   }
  // };
  
  

  const changeCount = async (email, f) => {
    try {
      if (f === 1) {
        let flag = 0;
        let c;
        for (let i = 0; i < stateFriends.length; i++) {
          if (stateFriends[i].email === email) {
            flag = 1;
            c = stateFriends[i].unreadCount + 1;
          }
        }
        if(flag == 0)
        c = 1;

        await axios.post("http://127.0.0.1:5000/updateCount", {
              email: stateEmail,
              remail: email,
              count: c,
            });

      } else
        await axios.post("http://127.0.0.1:5000/updateCount", {
          email: stateEmail,
          remail: email,
          count: 0,
        });

      if (count === 0) setCount(1);
      else setCount(0);
    } catch (err) {
      console.log(err);
    }
  };

  const scrollBottom = () => {
    var objDiv = document.querySelector(".chat-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  };


  const active=(text)=>{
    let arr = document.getElementsByClassName('list-group-item');
    for(let i = 0;i<arr.length;i++){
        if(arr[i].textContent != text){
          arr[i].classList.remove("list-group-item-secondary");
        }
        else{
          arr[i].classList.add("list-group-item-secondary");
        }
    }
  }
  return (
    <Switch>
        <Route exact path={`${match.path}`}>
      <div className="left" w-100>
        <div className="alert alert-warning my-0 mt-0 mb-1" role="alert">
          Add a friend
        </div>
        <form onSubmit={(e) => submitHandler(e)} autocomplete="off">
          <div className="input-group flex-nowrap">
            <input
              type="email"
              className="form-control email"
              placeholder="Email"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              required
              id="addfriend-input"
            />
          </div>

          <div className="justify-content-center my-2">
            <button className="btn btn-secondary w-100">Add</button>
          </div>
        </form>
        <div className="title">Chat</div>
        <ul className="list-group">
          {stateFriends != ""
            ? stateFriends.map((ele) => {
                return (
                  <li
                    className="list-group-item"
                    onClick={(e) => nameClick(ele.email, ele.name)}
                  >
                    {ele.name}
                    <small>{ele.email}</small>
                    {ele.unreadCount != 0 ? (
                      <span className="badge badge-danger">
                        {ele.unreadCount}
                      </span>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
      </Route>
      <Route exact path={`${match.path}/chat`}>
      <div className="right">
      <div
          className="alert alert-success my-0 mt-0 mb-2"
          id="chatHead"
          role="alert"
        >
          {stateRname}
        </div>
        <div className="chat-container " >
          { chat !== "" ?chat.map((ele) => {
            return <RenderChat sender={ele.sender} message={ele.message} />;
          }) : ""}
        </div>
        {remail != "" ? <>
        
        <div className="sendMessage">
          <form onSubmit={(e) => sendMessage(e)} autocomplete="off">
            <div className="input-group flex-nowrap message">
              <input
                type="text"
                className="form-control email"
                placeholder="Type any message"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                id="sendMessage-input"
              />
              <button className="btn btn-secondary float-right ml-2">
                send
              </button>
            </div>
          </form>
        </div> </>: ""}
    </div>
    </Route>
    </Switch>
  );
};

export default Mobile;
