import $ from 'jquery';
import Timer from './js/Timer';
import Pomodoro from './js/Pomodoro';
import Todo from './js/Todo';

// favicons
require('./favicons/favicon-16x16.png');
require('./favicons/favicon-32x32.png');

// css
require('./style.css');


$(document).ready(function() {
  Timer.init();
  Events.init();
  Todo.init();
});