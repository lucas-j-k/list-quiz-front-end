import React, { Component } from 'react';


class Menu extends Component {
  constructor(props){
    super(props)
    this.state={
      variantValue: "1",
      listValue: "1",
    }
    this.handleVariantValueChange = this.handleVariantValueChange.bind(this);
    this.handleListValueChange = this.handleListValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.masterLists.length !== prevProps.masterLists.length) {
      this.setState({
        listValue: this.props.masterLists[0].id
      });
    }
  }
  handleVariantValueChange(event){
    this.setState({variantValue: event.target.value});
  }
  handleListValueChange(event){
    this.setState({listValue: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
    let listEndpoint = `${this.props.apiRoot}/api/list/${this.state.listValue}`;
    let entriesEndpoint = `${this.props.apiRoot}/api/list/${this.state.listValue}/entries?transformation=${this.state.variantValue}`
    this.props.fetchList(listEndpoint, entriesEndpoint);
  }
  render() {
    let listOptions = this.props.masterLists.map((list)=>{
      return <option value={list.id}>{list.name}</option>
    })
    let variationsMarkup = this.props.variations.map((variation)=>{
      return <option value={variation.value}>{variation.name}</option>
    })
    let menuDisplayClass = this.props.showMenu ? "menu--show" : "menu--hide";
    let introContent = this.props.running ?
      "Select a new list and format to switch to a new test" :
      "Select a list and a format below, and click 'Launch' to start revising the list!";
    let currentList = this.props.currentListName ?
      <span className="menu__current">{this.props.currentListName }</span> :
      <span className="menu__current">Select a List</span>;
    return (
      <div className={menuDisplayClass}>
        <div className="menu__header">
          <span className="menu__title">{this.props.title}</span>
          <span className="menu__current">{currentList}</span>
          <button className="menu__close btn" onClick={(e)=>{this.props.toggleMenu(false)}}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="menu__intro">
          <p>{introContent}</p>
        </div>
        <form className="menu__form" onSubmit={this.handleSubmit}>
          <label className="menu__label">
            <p className="menu__label-tag">Choose a List:</p>
              <select className="menu__dropdown" value={this.state.listValue} onChange={this.handleListValueChange}>
                {listOptions}
              </select>
          </label>
          <label className="menu__label">
            <p className="menu__label-tag">Choose a Question Format:</p>
              <select className="menu__dropdown" value={this.state.variantValue} onChange={this.handleVariantValueChange}>
                {variationsMarkup}
              </select>
          </label>
          <input className="menu__submit btn" type="submit" value="Launch" />
        </form>
      </div>
    )
  }
}


export default Menu;
