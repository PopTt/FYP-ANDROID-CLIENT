const attendanceStore = {
    attendances: []
}

const attendanceReducer = (prevState, action) => {
    switch(action.type){
        case 'RETRIEVE_ATTENDANCES':
            return {
                ...prevState,
                attendances: action.attendances
            }
        
        case 'LOGOUT':
            return {
                ...prevState,
                attendances: [],
            }
    }
}


export {attendanceStore, attendanceReducer}