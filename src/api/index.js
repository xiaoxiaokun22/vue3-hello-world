import request from '../utils/request';
import qs from 'qs';

export const loginRequest = data => {
    return request({
        url: '/login/login_success.json',
        method: 'get',
        params: data
    });
};

export const dashboardBrands = data => {
    return request({
        url: '/dashboard/brands.json',
        method: 'get',
        params: data
    });
};
export const dashboardChart = data => {
    return request({
        url: '/dashboard/chart.json',
        method: 'get',
        params: data
    });
};
export const dashboardStatistic = data => {
    return request({
        url: '/dashboard/statistic.json',
        method: 'get',
        params: data
    });
};
export const apiActivityList = data => {
    return request({
        url: '/activity/manage.json',
        method: 'get',
        params: data
    });
};

