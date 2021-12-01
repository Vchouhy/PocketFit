import axios from "axios";
import * as json from "../../components/Timetable/Hard-code.json";

//ACTIONS NAMES
export const GET_LESSONS = "GET_LESSONS";
export const GET_EVENTS = "GET_EVENTS";
export const GET_WEEK_SHIFTS = "GET_WEEK_SHIFTS";

export function getLessons() {
  return async function (dispatch) {
    await axios
      .get("http://localhost:3001/api/events/all")
      .then((res) => {
          let lessons = res.data.filter((cla)=>cla.kindOfEvent === "Clases")
        dispatch({
          type: GET_LESSONS,
          value: lessons,
        });
      });
  };
}

export function getEvents() {
  return async function (dispatch) {
    await axios
      .get("http://localhost:3001/api/events/all")
      .then((res) => {
          let events = res.data.filter((cla)=>cla.kindOfEvent === "Eventos")
        dispatch({
          type: GET_EVENTS,
          value: events,
        });
      });
  };
}

export function getWeekShifts() {
  /* return async function (dispatch) {
    await axios
      .get("http://localhost:3001/api/events/all")
      .then((res) => {
          let events = res.data.filter((cla)=>cla.kindOfEvent === "Eventos")
        dispatch({
          type: GET_EVENTS,
          value: events,
        });
      });
  }; */
  return {
    type: GET_WEEK_SHIFTS,
    value: json.shifts,
  }
}