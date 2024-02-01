import {
    FETCH_ACTIVE_CONTRACTS_REQUEST,
    FETCH_ACTIVE_CONTRACTS_SUCCESS,
    FETCH_ACTIVE_CONTRACTS_ERROR,
    STORE_WORK_LOCATION_DATA,
    FETCH_COUNTRIES,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_ERROR,
    FETCH_COUNTRYUI,
    FETCH_COUNTRYUI_SUCCESS,
    FETCH_COUNTRYUI_ERROR,
} from '../actions/workOrderActions';

const initialState = {
    loading: false,
    error: null,
    success: false,
    activeContracts: [],
    workLocations: [],
    countries: [],
    countryUi: [],
};

const workOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_CONTRACTS_REQUEST:
        case FETCH_COUNTRIES:
        case FETCH_COUNTRYUI:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ACTIVE_CONTRACTS_ERROR:
        case FETCH_COUNTRIES_ERROR:
        case FETCH_COUNTRYUI_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_ACTIVE_CONTRACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                activeContracts: action.payload,
            };

        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                countries: action.payload,
            };
        case FETCH_COUNTRYUI_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                countryUi: action.payload,
            };
        case STORE_WORK_LOCATION_DATA:
            return {
                ...state,
                loading: false,
                workLocations: action.payload,
            };

        default:
            return state;
    }
};

export default workOrderReducer;
