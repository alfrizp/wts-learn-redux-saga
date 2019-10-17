import { IMAGES } from '../constants';

export default (state = [], action) => {
    if (action.type === IMAGES.LOAD_SUCCESS) {
        return [...state, ...action.images];
    }

    return state;
}
