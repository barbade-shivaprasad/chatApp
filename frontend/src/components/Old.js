import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useDispatch } from 'react-redux';
import { visibleToast } from '../methods/visibleToast';
import { socket } from '../methods/socket';

const Old = () => {

  React.useEffect(() => {
    if(window.innerWidth <= 600){
      let ele = document.getElementsByClassName("mx-auto");
      
      ele[0].classList.remove('w-25')
      ele[1].classList.remove('w-25')
      ele[0].classList.add('w-75')
      ele[1].classList.add('w-75')


    }
  }, [])

  const dispatch = useDispatch();
  const {setEmail,setName,setToast,setProgress} = bindActionCreators(actionCreators,dispatch);

  const history = useHistory();
  const submitHandler=async(e)=>{
    try{

      e.preventDefault();
      setProgress(75)
      let email = document.querySelector('.email').value;
      
      let res = await axios.post('http://localhost:5000/old',{email:email})
      

      if(res.status === 200){
        setProgress(100)
        setEmail(email);
        setName(res.data);

        socket.emit('connected',(email));
        setProgress(100)
        history.push('/main');
      }
      else
      throw new Error(res.data)
    }
    catch(err){
      setProgress(100)
      console.log(err);
      setToast(err.message);
      visibleToast();
        setTimeout(() => {
          document.getElementById('toast').style.display='none'
        }, 2000);
    }}

  return (
    <>
    <form onSubmit={e=>submitHandler(e)}>
    <div className="input-group flex-nowrap  my-4 w-25 mx-auto">
  <div className="input-group-prepend">
    <span className="input-group-text" id="addon-wrapping">Email</span>
  </div>
  <input type="email" className="form-control email" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" required/>
</div>

<div className="justify-content-center w-25 mx-auto my-3"><button className="btn btn-secondary">Go</button></div>
</form></>
  )
}

export default Old