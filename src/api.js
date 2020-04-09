import { ModelTask } from "./model-task";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export default class API {
  constructor(props) {
    this._endPoint = props.endPoint;
    this._authorization = props.authorization;
  }

  createTask({ task }) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(ModelTask.toRaw(task)),
      headers: new Headers({ "Content-Type": `application/json` }),
    })
      .then(API.toJson)
      .then(ModelTask.parseTask);
  }

  getTasks() {
    return this._load({ url: `tasks` })
      .then(API.toJson)
      .then(ModelTask.parseTasks);
  }

  updateTask({ id, data }) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(ModelTask.toRaw(data)),
      headers: new Headers({ "Content-Type": `application/json` }),
    })
      .then(API.toJson)
      .then(ModelTask.parseTask);
  }

  deleteTask({ id }) {
    return this._load({ url: `tasks/${id}`, method: Method.DELETE });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(API.checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  static toJson(response) {
    return response.json();
  }
}
