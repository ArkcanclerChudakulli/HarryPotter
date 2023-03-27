let score = 0;
let questions_count = 0;
let correctAnswer;
let correct = 0;
let options;
let skill = '';

function mirror(txt, speed = 20, color){
$('#mirror_txt').replaceWith( '<marquee id="mirror_txt" class="font text-center align-middle ' + color + '" direction="up" scrolldelay="1" scrollamount="' + speed + '" behavior="slide"><font id="road_text">' + txt + '</font></marquee>' );
}

function mirror_eval(txt, speed = 20, color){
$('#eval_txt').replaceWith( '<marquee id="eval_txt" class="font text-center align-middle ' + color + '" direction="up" scrolldelay="1" scrollamount="' + speed + '" behavior="slide"><font id="road_text">' + txt + '</font></marquee>' );
}

function choose(num){
	if(options[num-1] == correctAnswer){
		mirror_eval('Верно', 20, "green");
		correct++;
		win();
	} else {
		mirror_eval('Неверно. Правильный ответ: "' + correctAnswer + '"', 20, "red");
	}
	next();
}

function next(){
	if(questions_count>=questions.length-1){
		$('.game_button').prop('disabled', true);
		let overall = questions.length;
		let percent = calculatePercent(correct,overall);
		let msg = 'Вы правильно ответили: ' + percent + '%('
		+ correct + '/' + overall + ').';
		let color = 'red';
		if(percent>=65){
			skill+='Освоена книга "Гарри Поттер и Узник Азкабана"';
			$('#skill').html(skill);
			color = 'green';
			msg+=' Поздравляем! Вы освоили "Гарри Поттера".'; 
		} else{
			msg+=' Попробуйте ещё раз.'
		}
		mirror(msg, 20, color);
		emptyOptions();
		questions_count=0;
		shuffle(questions);
	} else {
		questions_count++;
		mirror(questions[questions_count].definition, 20, 'blue');
		randomAnswers();
	}
}

function calculatePercent(correct,overall){
	let num = correct/overall*100;
	return parseFloat(num).toFixed(0);
}

function win(){
	$('#score').html(new Intl.NumberFormat().format(score+=10));
	levelup();
}

function levelup(){
	if(score>90) $('#status').html('Гермиона Грейнджер');
	else if(score>80) $('#status').html('Перси Уизли');
	else if(score>70) $('#status').html('Гарри Поттер');
	else if(score>60) $('#status').html('Парвати Патил');
	else if(score>50) $('#status').html('Дин Томас');
	else if(score>40) $('#status').html('Симус Финниган');
	else if(score>30) $('#status').html('Джордж Уизли');
	else if(score>20) $('#status').html('Фред Уизли');
	else if(score>10) $('#status').html('Невилл Долгопупс');
	else if(score>0) $('#status').html('Рон Уизли');
}

function toggle(){
	if($('#learn').is('[disabled]')){
		$('#learn').prop('disabled', false);
		$('.game_button').prop('disabled', true);
	} else {
		$('#learn').html('Квиз по Гарри Поттеру');
		$('#learn').prop('disabled', true);
		$('.game_button').prop('disabled', false);
	}
}

function learn(){
	$('#game').show();
	toggle();
	randomAnswers();
	mirror(questions[questions_count].definition, 20, 'blue');
}

function randomAnswers(){
	correctAnswer = questions[questions_count].options[0];
	options = questions[questions_count].options;
	shuffle(options);
	$('#first').html(options[0]);
	$('#second').html(options[1]);
	$('#third').html(options[2]);
	$('#forth').html(options[3]);
}

function emptyOptions(){
	$('#first').html('');
	$('#second').html('');
	$('#third').html('');
	$('#forth').html('');
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

let questions = [
		{
			definition: 'Какое прозвище было у Венделины, ведьмы, которая в Средние века любила гореть на костре?',
			options: ['Странная',
					  'Стрёмная',
					  'Тёмная',
					  'Томная']
		},
		{
			definition: 'Какого цвета были ядовитые слизняки в магазине "Волшебный зверинец", где Гермиона купила Живоглота?',
			options: ['Оранжевые',
					  'Зелёные',
					  'Пурпурные',
					  'Жёлтые']
		},
		{
			definition: 'Первый упомянутый в 3 части пароль в гостиную Гриффиндора?',
			options: ['Фортуна Майор',
					  'Чепуха',
					  'Светляки',
					  'Лимонный щербет']
		},
		{
			definition: 'Читая расписание Гермионы, Рон заметил, что ровно в 9 у неё помимо Прорицания будут ещё 2 урока. Какие?',
			options: ['Нумерология и Магловедение',
					  'Нумерология и Древние Руны',
					  'Магловедение и Древние Руны',
					  'Древние Руны и Астрономия']
		},
		{
			definition: 'Когда на первом уроке Прорицания Рон предсказал Гарри "Нежданную радость. Внезапно пролившийся золотой дождь.", что он увидел?',
			options: ['Жёлудь',
					  'Сокола',
					  'Цилиндр',
					  'Солнце']
		},
		{
			definition: 'Когда должно случиться то, чего больше всего опасается Лаванда Браун, согласно предсказанию профессора Трелони?',
			options: ['В пятницу 16 октября',
					  'В четверг 17 ноября',
					  'В среду 14 декабря',
					  'В субботу 19 сентября']
		},
		{
			definition: 'Сервиз какого цвета больше всего любит профессор Трелони?',
			options: ['Розовый',
					  'Голубой',
					  'Зелёный',
					  'Лиловый']
		},
		{
			definition: 'Кто из персонажей упоминает мальчика по имени Дэйви Гаджен?',
			options: ['Профессор Люпин',
					  'Профессор МакГонагалл',
					  'Мадам Помфри',
					  'Профессор Дамблдор']
		},
		{
			definition: 'В своей речи перед праздничным пиром по случаю начала года профессор Дамблдор НЕ упоминает одну из этих фамилий: Филч, Люпин, Кеттлберн, Хагрид. Какую?',
			options: ['Филч',
					  'Люпин',
					  'Кеттлберн',
					  'Хагрид']
		},
		{
			definition: 'Что во что нужно было превратить на экзамене по трансфигурации?',
			options: ['Черепаху в чайник',
					  'Кролика в тапочки',
					  'Ежа в иголку для булавок',
					  'Птицу в сосуд']
		}
];
 
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function load(){
	shuffle(questions);
	mirror('Ответьте на вопросы по книге "Гарри Поттер и Узник Азкабана"!', 20, 'black');
}