export const searchFunction = (data, searchCriteria, searchTerm) => {
  const filtered_data = data.filter(
    (row) =>
      row[searchCriteria].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  );
  return filtered_data;
};
