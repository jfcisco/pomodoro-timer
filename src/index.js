import $ from 'jquery';
import PTimer from './js/PTimer';
import PEvents from './js/PEvents';
import Todo from './js/Todo';

$(document).ready(function() {
  PTimer.init();
  PEvents.init();
  Todo.init();
});