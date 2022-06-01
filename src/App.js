import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      descriptionInput: '',
      attr1Input: 0,
      attr2Input: 0,
      attr3Input: 0,
      imageInput: '',
      rareInput: '',
      trunfoInput: false,
      saveButton: true,
      hasTrunfo: false,
      cardsList: [],
      searchFilter: '',
      rareFilter: 'todas',
    };

    this.clearState = this.clearState.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const {
        nameInput,
        descriptionInput,
        imageInput,
        rareInput,
        attr1Input,
        attr2Input,
        attr3Input,
      } = this.state;

      const maxAttr = 90;
      const maxSumAttr = 210;
      const verify = (attr) => parseInt(attr, 10) >= 0
        && parseInt(attr, 10) <= maxAttr;

      this.setState({
        saveButton:
          !(nameInput
            && descriptionInput
            && imageInput
            && rareInput
            && verify(attr1Input)
            && verify(attr2Input)
            && verify(attr3Input)
            && ((parseInt(attr1Input, 10)
              + parseInt(attr2Input, 10)
              + parseInt(attr3Input, 10) <= maxSumAttr))),
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      nameInput,
      descriptionInput,
      imageInput,
      rareInput,
      attr1Input,
      attr2Input,
      attr3Input,
      trunfoInput,
    } = this.state;

    const objCard = {
      nameInput,
      descriptionInput,
      imageInput,
      rareInput,
      attr1Input,
      attr2Input,
      attr3Input,
      trunfoInput,
    };

    this.setState((prevState) => ({
      cardsList: [...prevState.cardsList, objCard],
    }), () => this.verificaTrunfo());
  }

  verificaTrunfo = () => {
    const { cardsList } = this.state;
    const verifyTrunfo = cardsList.find((card) => card.trunfoInput);
    if (verifyTrunfo) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
    this.clearState();
  }

  searchCard = ({ target }) => this.setState({ searchFilter: target.value });

  filterRareCard = ({ target }) => this.setState({ rareFilter: target.value });

  clearState() {
    this.setState({
      nameInput: '',
      descriptionInput: '',
      attr1Input: 0,
      attr2Input: 0,
      attr3Input: 0,
      imageInput: '',
      rareInput: '',
      trunfoInput: false,
      saveButton: true,
    });
  }

  deleteCard({ target }) {
    const { cardsList } = this.state;
    const array = cardsList.filter((card) => card.nameInput !== target.name);
    this.setState({ cardsList: array }, () => this.verificaTrunfo());
  }

  render() {
    const {
      nameInput,
      descriptionInput,
      attr1Input,
      attr2Input,
      attr3Input,
      imageInput,
      rareInput,
      trunfoInput,
      saveButton,
      hasTrunfo,
      cardsList,
      searchFilter,
      rareFilter,
    } = this.state;
    return (
      <>
        <Form
          cardName={ nameInput }
          cardDescription={ descriptionInput }
          cardAttr1={ attr1Input }
          cardAttr2={ attr2Input }
          cardAttr3={ attr3Input }
          cardImage={ imageInput }
          cardRare={ rareInput }
          cardTrunfo={ trunfoInput }
          onInputChange={ this.handleChange }
          isSaveButtonDisabled={ saveButton }
          onSaveButtonClick={ this.handleSubmit }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ nameInput }
          cardDescription={ descriptionInput }
          cardAttr1={ attr1Input }
          cardAttr2={ attr2Input }
          cardAttr3={ attr3Input }
          cardImage={ imageInput }
          cardRare={ rareInput }
          cardTrunfo={ trunfoInput }
        />
        <div className="card-list">
          <h3>Todas as cartas</h3>
          <div>
            <h4>Filtros de busca</h4>
            <label htmlFor="search-card">
              <input
                type="text"
                placeholder="Nome da carta"
                data-testid="name-filter"
                htmlFor="search-card"
                onChange={ this.searchCard }
                value={ searchFilter }
              />
            </label>
            <select
              data-testid="rare-filter"
              onChange={ this.filterRareCard }
              value={ rareFilter }
            >
              <option value="todas">Todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </div>
          {
            cardsList.filter((searchCa) => searchCa.nameInput.includes(searchFilter))
              .map((card) => (
                <div className="card-content" key={ card.nameInput }>
                  <Card
                    cardName={ card.nameInput }
                    cardDescription={ card.descriptionInput }
                    cardAttr1={ card.attr1Input }
                    cardAttr2={ card.attr2Input }
                    cardAttr3={ card.attr3Input }
                    cardImage={ card.imageInput }
                    cardRare={ card.rareInput }
                    cardTrunfo={ card.trunfoInput }
                  />

                  <button
                    type="button"
                    data-testid="delete-button"
                    name={ card.nameInput }
                    onClick={ this.deleteCard }
                  >
                    Excluir
                  </button>
                </div>
              ))
          }
        </div>

      </>
    );
  }
}

export default App;
