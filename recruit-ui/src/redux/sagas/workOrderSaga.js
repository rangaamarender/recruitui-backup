import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_ACTIVE_CONTRACTS_REQUEST,
    FETCH_COUNTRIES,
    FETCH_COUNTRYUI,
    fetchActiveContractsError,
    fetchActiveContractsSuccess,
    fetchCountriesError,
    fetchCountriesSuccess,
    fetchCountryUiError,
    fetchCountryUiSuccess,
} from '../actions/workOrderActions';

function* fetchActiveContracts(action) {
    try {
        const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/activecontracts');
        yield put(fetchActiveContractsSuccess(response.data));
    } catch (error) {
        yield put(fetchActiveContractsError(error));
    }
}

function* fetchCountries(action) {
    try {
        const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/country');
        console.log(response,'9000-country')
        yield put(fetchCountriesSuccess(response.data));
    } catch (error) {
        yield put(fetchCountriesError(error));
    }
}

function* fetchCountryUi(action) {
    try {
        const { code } = action.payload;
        const response = yield call(axios.get, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/addressformat/${code}`);
        console.log(response,'9000-country-ui')
        yield put(fetchCountryUiSuccess(response.data));
    } catch (error) {
        yield put(fetchCountryUiError(error));
    }
}

function* workOrderSaga() {
    yield takeLatest(FETCH_ACTIVE_CONTRACTS_REQUEST, fetchActiveContracts);
    yield takeLatest(FETCH_COUNTRIES, fetchCountries);
    yield takeLatest(FETCH_COUNTRYUI, fetchCountryUi);
}

export default workOrderSaga;
