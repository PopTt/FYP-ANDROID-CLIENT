const authStore = {
    id:null,
    firstName: null,
    lastName: null,
    email: null,
    token: null
}

const loginReducer = (prevState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...prevState,
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                token: action.token
            }
        
        case 'LOGOUT':
            return {
                ...prevState,
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                token: null
            }
    }
}


export {authStore, loginReducer}