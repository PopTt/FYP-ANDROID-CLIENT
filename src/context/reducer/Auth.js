const authStore = {
    id: null,
    username: null,
    email: null,
    acctype: null
}

const loginReducer = (prevState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...prevState,
                id: action.id,
                username: action.username,
                email: action.email,
                acctype: action.acctype
            }
        
        case 'LOGOUT':
            return {
                ...prevState,
                id: null,
                username: null,
                email: null,
                acctype: null
            }
    }
}


export {authStore, loginReducer}