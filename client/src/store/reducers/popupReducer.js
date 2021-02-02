import * as Types from '../actions/types'

const init = {
    showPopup: false,
}
const popupReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SET_POPUP: {
            return {
                showPopup: action.payload.popupOpen ? action.payload.popupOpen : false,
            }
        }
        default: return state
    }
}

export default popupReducer