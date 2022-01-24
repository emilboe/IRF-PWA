const initialState = {
    loggedIn: false,
    user: {}
};
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function reducer(
    state = initialState, { type, payload }: { type: string, payload: any }
): any {
    // work with state
    switch (type) {
        case 'SET_USER_STATE':
            console.log('user set payload: ', payload)
            return {
                ...state,
                user: {
                    username: capitalizeFirstLetter(payload.split('@')[0])
                }
            }

        case 'SET_DARK_MODE':
            console.log('reducing payload to : ', payload)
            return {
                ...state,
                user: {
                    username: capitalizeFirstLetter(payload.split('@')[0])
                }
            }
    }
    return state;
}