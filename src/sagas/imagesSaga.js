import { takeEvery, select, call, put } from 'redux-saga/effects';

import { IMAGES } from '../constants';
import { setImages, setError } from '../actions';
import { fetchImages } from '../apis';

const getPage = state => state.nextPage;

function* handleImagesLoad() {
    try {
        const page = yield select(getPage);
        const images = yield call(fetchImages, page);
        yield put(setImages(images));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchImagesLoad() {
    yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}
