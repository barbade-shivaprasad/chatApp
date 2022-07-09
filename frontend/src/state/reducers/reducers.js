export const nameReducer=(state="shiba",action)=>{
    if(action.type === "changeName"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const emailReducer=(state="",action)=>{
    if(action.type === "changeEmail"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const remailReducer=(state="",action)=>{
    if(action.type == "changeRemail"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const rnameReducer=(state="",action)=>{
    if(action.type == "changeRname"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const friendsReducer=(state="",action)=>{
    if(action.type == "changeFriends"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const chatReducer=(state="",action)=>{
    if(action.type == "changeChat"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const toastReducer=(state="",action)=>{
    if(action.type == "changeToast"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const countReducer=(state=0,action)=>{
    if(action.type == "changeCount"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const progressReducer=(state=0,action)=>{
    if(action.type == "changeProgress"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}

