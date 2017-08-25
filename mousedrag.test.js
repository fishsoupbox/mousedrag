var cqp = $('.cqp'), warp = $('.warp');
var distanceX, distanceY, _top, _left;

var nsize = 20;
var colorLst = ['#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9','#9b59b6','#8e44ad','#34495e','#2c3e50','#f1c40f','#f39c12','#e67e22','#d35400','#e74c3c','#c0392b','#ecf0f1','#bdc3c7','#95a5a6','#7f8c8d'];
var chooseColor = $('<div></div>')
						.addClass('chooseColor')
							.css({
								'position' : 'fixed',
								'width' : (nsize + 5) * (colorLst.length + 1),
								'height' : nsize,
								'right' : '10px',
								'bottom' : '10px'});
var specialColor = $('<span></span>')
						.addClass('itemColor itemColor-'+0)
							.css({
								'position' : 'absolute',
								'left' : 0 ,
								'width' : nsize,
								'height' : nsize,
								'cursor' : 'pointer'})
								.appendTo(chooseColor);

specialColor[0].style.backgroundImage = 'linear-gradient(135deg, '+ colorLst[0] +','+ colorLst[parseInt((colorLst.length - 1)/2)] +','+ colorLst[colorLst.length - 1] +')';

for (var i = 0; i < colorLst.length; i++) {
	let _this = i;
	(function(){
		$('<span></span>')
				.addClass('itemColor itemColor-'+_this)
					.css({'position' : 'absolute', 'width' : nsize, 'height' : nsize, 'cursor' : 'pointer', 'left' : (_this + 1) * (nsize + 5) , 'backgroundColor' : colorLst[_this]})
						.appendTo(chooseColor);
	})();
}
chooseColor.appendTo('body');

var silder = {
	drag : function(e){
		
		let self, realTop, realLeft;

		self = e.data;

		self.addClass('draging');

		realTop 	= e.pageY - self.data('data_top');
		realLeft 	= e.pageX - self.data('data_left');

		self.css('top', realTop - distanceY + _top);
		self.css('left', realLeft - distanceX +  _left);
		self.css('z-index', 2);

		console.log(realTop +','+ distanceY +','+ _top);
	},
	drop : function(e){
		let self;

		self = e.data;
		self.removeClass('draging');
		self.css('top', self.data('data_top') - _top);
		self.css('left', self.data('data_left') - _left);
		self.css('z-index', 0);

		$(document).off('mousemove').off('mouseup');
	}
}

$(document).on('click', '.chooseColor span', changeColor);

cqp.each(function(index, cur){
	let self = $(this);
	self.data('data_top', self.offset().top);
	self.data('data_left', self.offset().left);
	self.css({
		'z-index' : 0,
		'backgroundColor' : colorLst[index]
	});
})

cqp.on('mousedown', function(ev){
	//控制对象
	let self = $(this);
	//获取当前点击位置
	distanceX = ev.pageX;
	distanceY = ev.pageY;

	_top 	= self.offset().top;
	_left 	= self.offset().left;

	$(document).on('mousemove', $(this), silder.drag).on('mouseup', $(this), silder.drop);

	ev.preventDefault();
});

function changeColor(ev){
	let self = $(this);
	if(self.css('backgroundImage') != 'none'){
		cqp.each(function(index){
			$(this).css('backgroundColor', colorLst[index]);
		})
	}else {
		cqp.css('backgroundColor', self.css('backgroundColor'));
	}
}
