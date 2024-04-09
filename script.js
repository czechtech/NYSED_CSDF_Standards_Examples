// Credit to Mr. Polywhirl at https://stackoverflow.com/questions/66989506/filtering-html-table-columns-with-select-dropdowns

const
  table = document.querySelector('.filter-table'),
  filterState = {};

const dataFromRow = (row, headers) =>
  Object.fromEntries([...row.querySelectorAll('td')]
    .map((td, index) => [headers[index], td.textContent]));

const matchesCriteria = (rowData, filters) =>
  filters.every(([key, value]) => rowData[key] === value);

const refresh = () => {
  const
    headers = [...table.querySelectorAll('thead th')].map(th => th.textContent),
    filters = Object.entries(filterState),
    showAll = filters.length === 0;
  table.querySelectorAll('tbody tr').forEach(row => {
    const show = showAll || matchesCriteria(dataFromRow(row, headers), filters);
    row.classList.toggle('hidden-row', !show);
  });
};

const handleFilterChange = (e) => {
  const
    field = e.target.dataset.field,
    value = e.target.value;
  if (value) { filterState[field] = value; }
  else { delete filterState[field]; }
  refresh();
};

document.querySelectorAll('.filter').forEach(filter =>
  filter.addEventListener('change', handleFilterChange));
