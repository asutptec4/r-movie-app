import PropTypes from 'prop-types';

export default class SelectOption {
  constructor(id, name, selected) {
    this.id = id;
    this.name = name;
    this.selected = selected;
  }
}

SelectOption.propTypes = PropTypes.exact({
  id: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
});
