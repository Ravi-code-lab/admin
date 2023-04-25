import moment from "moment";


// Convert Local time of Mobile Time Fromater to UTC
export function MobileDateToUTC(mobiledate){
    return moment(mobiledate['$d']).utc().toISOString();
}

export function onChangeMobileDateValue(e,handleChange,id){
    e['target']= {
      'value':MobileDateToUTC(e),
      'id':id,
      'name':id
    }; 
    handleChange(e)
}