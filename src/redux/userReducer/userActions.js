export const setUser = (user)=>{
    return {
        type: "SET_USER",
        payload: user
    }
}

export const setCollection = (collectionName)=>{
    return {
        type: "SET_COLLECTION",
        payload: collectionName
    }
}

export const setNotes = (notes)=>{
    return {
        type: "SET_NOTES",
        payload: notes
    }
}