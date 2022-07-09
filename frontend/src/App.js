import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Old from './components/Old'
import New from './components/New'
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './methods/socket';
import LoadingBar from 'react-top-loading-bar';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import Mobile from './components/Mobile';



const App = () => {

  const email = useSelector((state)=>state.emailReducer);
  const toast = useSelector((state)=>state.toastReducer);
  const progress = useSelector((state)=>state.progressReducer);

  const dispatch = useDispatch();
  const {setProgress} = bindActionCreators(actionCreators,dispatch)

    socket.on('connect',()=>{
      if(email !== ""){

        socket.emit('connected',(email));
      }
    }) 

  //sdfsdf
   return <Router>
     <LoadingBar
        color='#8e24aa'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />
     <div className="alert alert-danger my-2" id="toast" role="alert">
  {toast}
  </div>
    <Switch>
      <Route exact path = "/">
        <div className="container-2 mx-auto my-5">
        <Link to='/new'><button type="button" className="btn btn-primary mx-2">New User</button></Link>
        <Link to = '/old'><button type="button" className="btn btn-success mx-2">Old User</button></Link>
        </div>
      </Route>
      <Route path = '/new'>
        <New />
      </Route>
      <Route path = '/old'>
        <Old/>
      </Route>
      <Route  path='/main'>
        {window.innerWidth <= 600 ?<Mobile/> : <Main/>}
      </Route>
    </Switch>
  </Router>
}

export default App