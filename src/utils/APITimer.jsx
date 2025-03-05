const APITimer = (API_ID, UserName, API_START_TIME, API_END_TIME, DIFF) => {
  const API_DATA_OBJ = {
    ID: API_ID,
    UserName: UserName,
    StartTime: API_START_TIME,
    EndTime: API_END_TIME,
    Diff: DIFF,
  };

  const API_Info = JSON.parse(sessionStorage.getItem("API_DATA")) || [];
  API_Info.push(API_DATA_OBJ);
  sessionStorage.setItem("API_DATA", JSON.stringify(API_Info));
};

export default APITimer;
