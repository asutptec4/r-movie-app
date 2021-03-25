import { DELETE_ACTION, EDIT_ACTION } from './constant';

export const availableFilterOptions = [
  { id: 'All', name: 'All' },
  { id: 'Action', name: 'Action' },
  { id: 'Documentary', name: 'Documentary' },
  { id: 'Comedy', name: 'Comedy' },
  { id: 'Horror', name: 'Horror' },
  { id: 'Crime', name: 'Crime' },
];

export const availableSortingOptions = [
  { id: 'release_date', name: 'Release Date' },
  { id: 'vote_average', name: 'Average Votes' },
];

export const movieCardOptions = [
  { id: EDIT_ACTION, name: 'Edit' },
  { id: DELETE_ACTION, name: 'Delete' },
];

export const moviesPerPage = 15;
