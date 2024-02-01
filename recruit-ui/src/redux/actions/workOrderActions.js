// import { Code } from 'quill';

export const FETCH_ACTIVE_CONTRACTS_REQUEST = 'FETCH_ACTIVE_CONTRACTS_REQUEST';
export const FETCH_ACTIVE_CONTRACTS_SUCCESS = 'FETCH_ACTIVE_CONTRACTS_SUCCESS';
export const FETCH_ACTIVE_CONTRACTS_ERROR = 'FETCH_ACTIVE_CONTRACTS_ERROR';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_ERROR = 'FETCH_COUNTRIES_ERROR';
export const FETCH_COUNTRYUI = 'FETCH_COUNTRYUI';
export const FETCH_COUNTRYUI_SUCCESS = 'FETCH_COUNTRYUI_SUCCESS';
export const FETCH_COUNTRYUI_ERROR = 'FETCH_COUNTRYUI_ERROR';

export const fetchActiveContracts = () => ({
    type: FETCH_ACTIVE_CONTRACTS_REQUEST,
});

export const fetchActiveContractsSuccess = (data) => ({
    type: FETCH_ACTIVE_CONTRACTS_SUCCESS,
    payload: data,
});

export const fetchActiveContractsError = (err) => ({
    type: FETCH_ACTIVE_CONTRACTS_ERROR,
    payload: err,
});

export const fetchCountries = () => ({
    type: FETCH_COUNTRIES,
});

export const fetchCountriesSuccess = (data) => ({
    type: FETCH_COUNTRIES_SUCCESS,
    payload: data,
});

export const fetchCountriesError = (err) => ({
    type: FETCH_COUNTRIES_ERROR,
    payload: err,
});

export const fetchCountryUi = (code) => ({
    type: FETCH_COUNTRYUI,
    payload: code,
});

export const fetchCountryUiSuccess = (data) => ({
    type: FETCH_COUNTRYUI_SUCCESS,
    payload: data,
});

export const fetchCountryUiError = (err) => ({
    type: FETCH_COUNTRYUI_ERROR,
    payload: err,
});

export const STORE_WORK_LOCATION_DATA = 'STORE_WORK_LOCATION_DATA';

export const storeWorkLocation = (location) => ({
    type: STORE_WORK_LOCATION_DATA,
    payload: location,
});
