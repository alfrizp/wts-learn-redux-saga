import { runSaga } from 'redux-saga';
import { getPage, handleImagesLoad } from '../imagesSaga';

import { setImages, setError } from '../../actions';
import * as apis from '../../apis';

test('Selector gives back the page', () => {
    const nextPage = 1;
    const state = { nextPage };
    const res = getPage(state);
    expect(res).toBe(nextPage);
});

test('Should load images and handle them in case of success', async () => {
    // dispatched actions
    const dispatchedActions = [];

    const mockedImages = ['abc', 'div'];
    apis.fetchImages = jest.fn(() => Promise.resolve(mockedImages));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImagesLoad).done;

    expect(apis.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

test('Should handle errors in case of fail', async () => {
    // dispatched actions
    const dispatchedActions = [];

    const error = 'Some error is thrown'
    apis.fetchImages = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImagesLoad).done;

    expect(apis.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});

