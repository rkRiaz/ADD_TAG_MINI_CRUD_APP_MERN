import * as Types from "./types"

export const popupAction = (action) => dispatch => {
    if(action === 'open') {
        dispatch({
            type: Types.SET_POPUP,
            payload: {
                popupOpen: true,
            }
        })
    } else {
        dispatch({
            type: Types.SET_POPUP,
            payload: {
                popupOpen: false,
            }
        })
    }
}