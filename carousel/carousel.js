var carousel = function(target,option) { /* 함수 파라미터 */
	var opt = {
		carouselTarget : document.querySelector(target),
		btnLeft : document.querySelector(option.button.left),
		btnRight : document.querySelector(option.button.right),
		targetTag : document.querySelectorAll(target+" "+option.targetTag),
		index : 0,
		widthCheck : function() {
			var targetTag = this.targetTag,
				width = targetTag[0].offsetWidth,
				length = targetTag.length,
				target = this.carouselTarget,
				i;
			target.style.width = width * length + "px";
			for(i=0;i<length;i++) {targetTag[i].style.width = width + "px"}
			return width;
		},
		paging : option.paging ? function() {
			var paging = document.querySelector(option.paging.target),
			pagingTag = document.querySelectorAll(option.paging.target+" "+option.paging.targetTag),
			index = opt.index,
			length = pagingTag.length,
			i;
			for(i=0;i<length;i++) {pagingTag[i].removeAttribute("class");}
			pagingTag[index].className = "on";
		} : null,
		tab : option.tab ? function() {
			var tab = document.querySelector(option.tab.target),
			tabTag = document.querySelectorAll(option.tab.target+" "+option.tab.targetTag),
			index = opt.index,
			length = tabTag.length,
			i;
			for(i=0;i<length;i++) {tabTag[i].removeAttribute("class");}
			tabTag[index].className = "on";
		} : null,
		act : function() {
			var width = opt.widthCheck(),
			tStyle = opt.carouselTarget.style,
			rel = this.getAttribute("data-rel"),
			length = opt.targetTag.length-1,
			index = opt.index;
			if(rel === "left") { 
				opt.index = opt.index !== 0 ? opt.index -= 1 : 0;
				tStyle.left = "-" + (width * opt.index) + "px";
			}
			if(rel === "right") { 
				opt.index = opt.index !== length ? opt.index += 1 : 0;
				tStyle.left = "-" + (width*opt.index) + "px";
			}
			if(option.paging) {opt.paging()}
			if(option.tab) {opt.tab()}
		}
	};
	opt.widthCheck();
	opt.btnLeft.addEventListener("click",opt.act,false);
	opt.btnRight.addEventListener("click",opt.act,false);
	return opt;
}