const eventStore = {
    events: [],
}

const eventReducer = (prevState, action) => {
    switch(action.type){
        case 'RETRIEVE_EVENTS':
            return {
                ...prevState,
                events: action.events
            }
        
        case 'LOGOUT':
            return {
                ...prevState,
                events: [],
            }
    }
}


export {eventStore, eventReducer}