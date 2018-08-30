import $ from 'jquery';
import PTimer from './js/PTimer';
import PEvents from './js/PEvents';
import Todo from './js/Todo';

// favicons
require('./favicons/favicon-16x16.png');
require('./favicons/favicon-32x32.png');

$(document).ready(function() {
  PTimer.init();
  PEvents.init();
  Todo.init();
});