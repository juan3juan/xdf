import { getRecordsByModule } from "../../server/zoho/zohoApi";
import * as types from "./actionTypes";

export function loadClientsSuccess(clients) {
  return { type: types.LOAD_CLIENTS_SUCCESS, clients };
}

export function loadClients() {
  return function(dispatch) {
    return getRecordsByModule("Contacts")
      .then(clients => {
        dispatch(loadClientsSuccess(clients));
      })
      .catch(error => {
        throw error;
      });
  };
}
