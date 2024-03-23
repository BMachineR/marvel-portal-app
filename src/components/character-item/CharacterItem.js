import "./character-item.scss";

function CharacterItem({ name, img, id, onSelectChar }) {
  return (
    <li onClick={() => onSelectChar(id)} className="char-item">
      <img className="item-img" src={img} alt={name} />
      <p className="item-name">{name}</p>
    </li>
  );
}

export default CharacterItem;
