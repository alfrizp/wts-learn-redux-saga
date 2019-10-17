import { take, fork, put, call } from 'redux-saga/effects';

import { IMAGES } from '../constants';
import { setImageStats, setImageStatsError, loadImageStats } from '../actions';
import { fetchImageStats } from '../apis';

function* handleStatsRequest(id) {
    for (let idx = 0; idx < 3; idx++) {
        try {
            yield put(loadImageStats(id));
            const res = yield call(fetchImageStats, id);
            yield put(setImageStats(id, res.downloads.total));
            return true;
        } catch (error) {}
    }

    yield put(setImageStatsError(id));
}

export default function* watchStatsRequest() {
    while (true) {
        const { images } = yield take(IMAGES.LOAD_SUCCESS);

        for (let idx = 0; idx < images.length; idx++) {
            yield fork(handleStatsRequest, images[idx].id);
        }
    }
}
