import { getRecordsByModule } from "../../server/zoho/zohoApi";
import * as types from "./actionTypes";

export function loadLeadsSuccess(leads) {
  return { type: types.LOAD_LEADS_SUCCESS, leads };
}

export function loadLeads() {
  return function(dispatch) {
    return getRecordsByModule("Leads")
      .then(leads => {
        dispatch(loadLeadsSuccess(leads));
      })
      .catch(error => {
        throw error;
      });
  };
}
