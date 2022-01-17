export const addFav = () => {
  return {
    type: "ADDFAV",
  };
};

export const addResponse = (data) => {
  return {
    type: "ADDRESPONSE",
    payload: {
      data: data,
    },
  };
};
