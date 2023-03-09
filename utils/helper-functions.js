import moment from "moment/moment";

export const calculateAge = (date) => {
    if (date){
        return new moment().diff(moment(date, "DD MMM YYYY"), 'years');
    }
    return null;
}
export function e(string){
    if(string){
       return string?.toString().replace(/(<([^>]+)>)/gi, '')
    }
}

export const getAutoCompleteValue = (options, value, filterField = 'id') => {
    return Array.isArray(options) ? options.find(option => option[filterField] === value) ?? null : null;
};