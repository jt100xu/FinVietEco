import React from 'react';
export const formatBirthday = (timestamp) => {
    var date = new Date(timestamp);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
};