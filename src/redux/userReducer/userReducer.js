const initial_state = {
    user:null,
    collection: null,
    notes: null
}

const userReducer = (prevState=initial_state, action)=>{
    if(action.type==="SET_USER")
    {
        return {
            ...prevState,
            user: action.payload
        }
    }
    else if(action.type === "SET_COLLECTION")
    {
        return {
            ...prevState,
            collection: action.payload
        }
    }
    else if(action.type === "SET_NOTES")
    {
        return {
            ...prevState,
            notes: action.payload
        }
    }
    else{
        return prevState
    }
}

export default userReducer