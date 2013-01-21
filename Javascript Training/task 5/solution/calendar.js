(function(){
	
	var calendar = function(){};
	
	calendar.prototype.currentDate = new Date();
	
	calendar.prototype.beforeEvents = [];
	
	calendar.prototype.afterEvents = [];
	
	calendar.prototype.getMonth = function(){
		 switch(this.currentDate.getMonth()){
			 case 0: return 'January';
			 case 1: return 'February';
			 case 2: return 'March';
			 case 3: return 'April';
			 case 4: return 'May';
			 case 5: return 'June';
			 case 6: return 'July';
			 case 7: return 'August';
			 case 8: return 'September';
			 case 9: return 'October';
			 case 10: return 'November';
			 case 11: return 'December';
		 }
	};
	
	calendar.prototype.changeDate = function(date){
		for(var i in this.beforeEvents){
			this.beforeEvents[i](this.currentDate);
		}
		
		this.currentDate = date;
		this.redraw();
		
		for(var i in this.afterEvents){
			this.afterEvents[i](this.currentDate);
		}
	};
	
	calendar.prototype.forward = function(){
		this.changeDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, this.currentDate.getDate()));
	};
	
	calendar.prototype.back = function(){
		this.changeDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()-1, this.currentDate.getDate()));
	};
	
	calendar.prototype.addBeforeMonthChangeEvent = function(func){
		this.afterEvents.push(func);
	};
	
	calendar.prototype.addAfterMonthChangeEvent = function(func){
		this.afterEvents.push(func);
	};
	
	calendar.prototype.render = function(container, weekEle, templateId){
		this.container = container;
		this.weekEle = weekEle;
		this.templateId = templateId;
		
		this.redraw();
	};
	
	calendar.prototype.redraw = function(){
		$(this.container).children().remove();
		
		var startDate = getCalendarStartPoint(this.currentDate);
		var endDate = getCalendarEndPoint(this.currentDate);
		var current = new Date();
		
		while(startDate < endDate) {
			
			var week = document.createElement(this.weekEle);
			
			for(var i = 0; i < 7; i++) {
				
				$(this.templateId).tmpl({
					Current: isSameDay(startDate, current) ? 'current' : '',
					Other: isSameMonth(startDate, this.currentDate) ? '' : 'other',
					Day: startDate.getDate()
				}).appendTo(week);
				
				startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
			}
			
			$(this.container).append(week);
		}
	};
	
	var isSameDay = function(date1, date2){
		return (date1.getFullYear() == date2.getFullYear()) && 
		(date1.getMonth() == date2.getMonth()) &&
		(date1.getDate() == date2.getDate());
	};
	
	var isSameMonth = function(date1, date2){
		return (date1.getFullYear() == date2.getFullYear()) && 
		(date1.getMonth() == date2.getMonth());
	};
	
	var getCalendarStartPoint = function(currentDate){
		return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - getMonthStartDay(currentDate));
	};
	
	var getMonthStartDay = function(currentDate){
		var startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
		return (startOfMonth == 0) ? 6 : startOfMonth - 1;
	};
	
	var getCalendarEndPoint = function(currentDate){
		return new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
	};
	
	window.Calendar = calendar;	
	
})();