import { Component } from "./component";

const COLORS_MAP = new Map([
  [`black`, `card--black`],
  [`yellow`, `card--yellow`],
  [`blue`, `card--blue`],
  [`green`, `card--green`],
  [`pink`, `card--pink`]
]);

export class TaskComponent extends Component {
  constructor(props) {
    super();

    this._color = props.color;
    this._id = props.id;
    this._isDone = props.isDone;
    this._isFavorite = props.isFavorite;
    this._repeatingDays = props.repeatingDays;
    this._tags = props.tags;
    this._title = props.title;
  }

  _getColorMap() {
    return COLORS_MAP;
  }

  _getColor() {
    return COLORS_MAP.get(this._color);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }
}
