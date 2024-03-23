import { Component } from "react";
import CharacterItem from "../character-item/CharacterItem";
import MarvelService from "../../services/marvelService";
import "./character-list.scss";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

class CharacterList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    offset: 210,
    newCharsLoading: false,
    isCharsEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.onRequest();
  };

  onRequest = () => {
    this.onNewCharsLoading();
    this.marvelService
      .getAllCharacters(this.state.offset)
      .then(this.onCharsLoaded)
      .catch(this.onCharsError);
  };

  onNewCharsLoading = () => {
    this.setState({ newCharsLoading: true });
  };

  onCharsLoaded = (newChars) => {
    this.setState(({ offset, chars }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      error: false,
      newCharsLoading: false,
      offset: offset + 6,
      isCharsEnded: newChars.length < 6 ? true : false,
    }));
  };

  onCharsError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { chars, loading, error, newCharsLoading, isCharsEnded } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <Error /> : null;

    const items = chars.map((item) => (
      <CharacterItem
        onSelectChar={this.props.onSelectChar}
        name={item.name}
        img={item.thumbnail}
        key={item.id}
        id={item.id}
      />
    ));

    return (
      <div className="char-list-wrapper">
        <ul className="char-list">{errorMessage || spinner || items}</ul>
        <button
          onClick={this.onRequest}
          disabled={newCharsLoading}
          hidden={isCharsEnded}
          className="loadmore-btn"
        >
          Load More
        </button>
      </div>
    );
  }
}

export default CharacterList;
