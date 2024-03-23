import { Component } from "react";
import MarvelService from "../../services/marvelService";
import Skeleton from "../skeleton/Skeleton";
import "./character-info.scss";

class CharacterInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidUpdate = (prevProps) => {
    if (prevProps.id !== this.props.id) {
      this.updateChar();
    }
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false });
  };

  onCharError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    this.onCharLoading();
    this.marvelService
      .getCharacter(this.props.id)
      .then(this.onCharLoaded)
      .catch(this.onCharError);
  };

  render() {
    const { char } = this.state;
    const skeleton = char ? null : <Skeleton />;
    const charTemplate = char ? <CharTemplate char={char} /> : null;
    return skeleton || charTemplate;
  }
}

function CharTemplate({ char }) {
  const { name, thumbnail, descr, wiki, homepage, comics } = char;
  let comicsItems = [];

  if (comics.length > 0) {
    for (let i = 0; i < comics.length && i < 10; i++) {
      comicsItems.push(
        <li className="comics-item" key={i}>
          <a
            target="_blank"
            href={`${comics[i].resourceURI}?apikey=8df7eb4ef2c3c511ddafaf8862566604`}
          >
            {comics[i].name}
          </a>
        </li>
      );
    }
  }

  return (
    <div className="char-info">
      <div className="char-info-main">
        <img className="char-info-thumb" src={thumbnail} alt={name} />
        <div>
          <p className="char-info-name">{name}</p>
          <a href={wiki} target="_blank" className="info-char-btn wiki-btn">
            Wiki
          </a>
          <a
            href={homepage}
            target="_blank"
            className="info-char-btn homepage-btn"
          >
            Homepage
          </a>
        </div>
      </div>
      <p>{descr}</p>
      <p>Comics:</p>
      <ul className="comics-list">
        {comicsItems.length > 0
          ? comicsItems
          : "There are no comics with this character"}
      </ul>
    </div>
  );
}

export default CharacterInfo;
