import ApplicationController from './application_controller';
import * as timeago from 'timeago.js';

export default class extends ApplicationController {
  connect() {
    timeago.render(this.element);
  }

  disconnect() {
    timeago.cancel();
  }
}
