export const setName=(name)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeName",
            payload:name
        })
    }
}
export const setEmail=(email)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeEmail",
            payload:email
        })
    }
}
export const setToast=(toast)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeToast",
            payload:toast
        })
    }
}
export const setRemail=(remail)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeRemail",
            payload:remail
        })
    }
}
export const setRname=(rname)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeRname",
            payload:rname
        })
    }
}
export const setChat=(chat)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeChat",
            payload:chat
        })
    }
}
export const setFriends=(friends)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeFriends",
            payload:friends
        })
    }
}
export const setCount=(count)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeCount",
            payload:count
        })
    }
}
export const setProgress=(progress)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeProgress",
            payload:progress
        })
    }
}



