(function(){

	var doc = $(document);

	$.fn.dragcopy = function(options){

		// object for window
		var f = $;
		var self = f(this);

		// object
		var _top;			// current object top
		var _left;			// current object left
		var distanceX;		// mouse and X axis distance
		var distanceY;		// mouse and Y axis distance
		var boxClose = true;
		var pointJudge = true;
		var warp = '#mc-dragWarp';
		var cqp = '.mc-cqp';
		var colorLst = ['#1abc9c','#16a085','#2ecc71','#27ae60','#3498db','#2980b9','#9b59b6','#8e44ad','#34495e','#2c3e50','#f1c40f','#f39c12','#e67e22','#d35400','#e74c3c','#c0392b','#ecf0f1','#bdc3c7','#95a5a6','#7f8c8d'];

		// box set
		const boxnum = 8;
		const boxsize = 150;
		const boxsizemargin = 10;

		// point set
		const pointsize = 20;
		const pointsizemargin = 5;
		var setClass = '.itemColor itemColor-';
		var specialClass = setClass+'0';

		$.extend({},options);

		init();

		if(pointJudge){
			var chooseColor = $('<div></div>')
								.addClass('chooseColor')
									.css({
										'position' : 'fixed',
										'width' : (pointsize + pointsizemargin) * (colorLst.length + 1),
										'height' : pointsize,
										'right' : '10px',
										'bottom' : '10px'});
			var specialColor = $('<span></span>')
								.addClass(specialClass)
									.css({
										'position' : 'absolute',
										'left' : 0 ,
										'width' : pointsize,
										'height' : pointsize,
										'cursor' : 'pointer',
										'backgroundImage' : 'linear-gradient(135deg, '+ colorLst[0] +','+ colorLst[parseInt((colorLst.length - 1)/2)] +','+ colorLst[colorLst.length - 1] +')',
										'backgroundImage' : '-webkit-linear-gradient(135deg, '+ colorLst[0] +','+ colorLst[parseInt((colorLst.length - 1)/2)] +','+ colorLst[colorLst.length - 1] +')'})
										.appendTo(chooseColor);
			
			for (let i = 0; i < colorLst.length; i++) {
				(function(){
					$('<span></span>')
							.addClass(setClass+i)
								.css({
									'position' : 'absolute',
									'width' : pointsize,
									'height' : pointsize,
									'cursor' : 'pointer',
									'left' : (i + 1) * (pointsize + pointsizemargin),
									'backgroundColor' : colorLst[i]})
									.appendTo(chooseColor);
				})();
			}
			chooseColor.appendTo('body');
		}

		var silder = {
			drag : function(ev){

				let self = ev.data;

				self.addClass('draging');
				self.css({
					'top' : ev.pageY - distanceY,
					'left' : ev.pageX - distanceX,
					'cursor' : 'grabbing',
					'z-index' : 2
				});
			},
			drop : function(ev){

				let self = ev.data;

				self.removeClass('draging');
				self.css({
					'top' : self.data('data_top'),
					'left': self.data('data_left'),
					'cursor' : 'grab',
					'z-index' : 0
				});

				doc.off('mousemove').off('mouseup');
			}
		}
		function init(){
			warp = f(warp);
			cqp = f(cqp);

			doc.on('click', '.chooseColor span', changeColor);

			warp.css({
				'width' : (boxsize+boxsizemargin) * boxnum - boxsizemargin,
				'height' : (boxsize+boxsizemargin) * (cqp.length % boxnum - 1)
			})

			cqp.each(function(index, cur){
				let self = $(this);
				let row  = Math.floor(index / boxnum);
				let cell = index % boxnum;

				self.css({
					'z-index' : 0,
					'top' : row * (boxsize + boxsizemargin),
					'left' : cell * (boxsize + boxsizemargin),
					'width' : boxsize,
					'height' : boxsize,
					'backgroundColor' : colorLst[index%colorLst.length]
				});
				self.data('data_top', self.css('top'));
				self.data('data_left', self.css('left'));
			})

			cqp.on('mousedown', function(ev){
				//控制对象
				let self = $(this);
				//获取当前点击位置
				distanceY = ev.pageY - parseInt(self.css('top'));
				distanceX = ev.pageX - parseInt(self.css('left'));

				doc.on('mousemove', $(this), silder.drag).on('mouseup', $(this), silder.drop);

				ev.preventDefault();
			});
		}

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
	}

})();

$(document).dragcopy();
