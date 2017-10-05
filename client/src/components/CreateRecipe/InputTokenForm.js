import React, { Component, PropTypes } from "react";
import _uniq from "lodash/uniq";
import _without from "lodash/without";
import classNames from "classnames";

class TokenInput extends Component {
  static defaultProps = {
    maxLength: 0,
    options: [],
    placeholder: "Choose option",
    value: []
  };

  state = {
    filter: "",
    isOpen: false
  };

  get selected() {
    const { options, value } = this.props;

    console.log(options, "???");

    return options.filter(option => value.indexOf(option.id) > -1);
  }

  get options() {
    const { options, value } = this.props;
    const { filter } = this.state;

    return options.filter(option => {
      const isSelected = value.indexOf(option.id) > -1;

      if (filter) {
        return !isSelected && new RegExp(filter, "gi").test(option.name);
      }

      return !isSelected;
    });
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  setContainerRef = node => {
    this.container = node;
  };

  handleChange = value => {
    const { name, onSelect } = this.props;

    onSelect({ target: { name, value } });
  };

  handleInput = ({ target: { value: filter } }) => {
    this.setState({ filter });
  };

  handleSelect = selectedId => () => {
    const { value, maxLength } = this.props;
    // if options maxLength reached
    if (maxLength && value.length >= maxLength) return;

    const selected = _uniq(value.concat([selectedId]));
    this.handleChange(selected);
    this.setState({
      filter: "",
      isOpen: false
    });
  };

  // unselect selected option
  handleRemove = removedId => () => {
    const selected = _without(this.props.value, removedId);

    this.handleChange(selected);
  };

  handleClickOutside = ({ target }) => {
    if (!this.container.contains(target)) {
      this.closeDropdown();
    }
  };

  closeDropdown = () => {
    if (this.state.isOpen) {
      this.setState({ filter: "", isOpen: false });
    }
  };

  openDropdown = () => {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  };

  render() {
    const { filter, isOpen } = this.state;
    const {
      className,
      disabled,
      id,
      isLoading,
      loaderElement,
      maxLength,
      name,
      placeholder,
      value,
      onKeyPress
    } = this.props;
    const isMaxLengthReached =
      maxLength !== 0 && value.length !== 0 && maxLength === value.length;

    return (
      <div
        ref={this.setContainerRef}
        className={classNames("ReactTokenInput", {
          "ReactTokenInput--disabled": disabled,
          "ReactTokenInput--is-loading": isLoading,
          "ReactTokenInput--maxlength": isMaxLengthReached,
          "ReactTokenInput--open": isOpen,
          [className]: className
        })}
      >
        {this.selected.map(this.renderSelectedToken)}
        {!isMaxLengthReached && (
          <div className="ReactTokenInput__input-col">
            <input
              autoComplete="off"
              className="ReactTokenInput__input"
              disabled={disabled}
              id={id}
              name={name}
              onChange={this.handleInput}
              placeholder={placeholder}
              spellCheck="false"
              value={filter}
              onFocus={this.openDropdown}
              onKeyPress={onKeyPress}
            />
            <div className="ReactTokenInput__options-list">
              {isLoading &&
                (loaderElement || (
                  <span className="ReactTokenInput__loading-label">
                    Loading...
                  </span>
                ))}
              {this.options.length ? (
                this.options.map(this.renderOption)
              ) : (
                <div className="text-muted p-1">
                  press enter to add custom ingredient
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  renderOption = option => {
    return (
      <div
        key={`option-${option.id}-${Math.floor(Math.random() * 99)}`}
        className="ReactTokenInput__option"
        onClick={this.handleSelect(option.id)}
      >
        {option.element || option.name}
      </div>
    );
  };

  renderSelectedToken = selected => {
    return (
      <div
        key={`token_${selected.id}-${Math.floor(Math.random() * 99)}`}
        className="ReactTokenInput__token"
      >
        <span className="icon-times" onClick={this.handleRemove(selected.id)}>
          &times;
        </span>
        {selected.name}
      </div>
    );
  };
}

export default TokenInput;
