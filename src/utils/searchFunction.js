export const searchFunction = (data, searchCriteria, searchTerm) => {
  if (!searchCriteria) return data;

  const filtered_data = data.filter(
    (row) =>
      row[searchCriteria].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  );
  return filtered_data;
};
