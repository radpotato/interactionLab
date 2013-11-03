/* 
	모듈이 되어서, 외부 파일에 저장될 아이
	carousel.js
	
	고려해야하는 것들.
	- 애니메이션 속도 // speed & time
	- 애니메이션 on off가능한가. // switch
	- 버튼은 있는가 없는가 // button
	- 페이징은 있는가 없는가 // pagination
	- 탭메뉴는 있는가 없는가 // tabMenu
	
	탭메뉴
		- 페이징 컴포넌트
		- 버튼 컴포넌트
		- 탭 컴포넌트
*/
var carousel = function(target, option) {
	var targetTag = document.getElementById(target),
	posX = 0,
	setOption = {
		index : 0,
		prIndex : 0,
		speed : option.speed ? option.speed : 1, 
		animate : option.animate ? option.animate : false,
		button : option.button ? {
			prev : document.getElementById(option.button.prev),
			next : document.getElementById(option.button.next)
		} : null,
		pagination : option.pagination ? {
			paging : document.getElementById(option.pagination.paging),
			pagingTag : document.getElementById(option.pagination.pagingTag)
		} : null,
		tabMenu : option.tabMenu ? function() {
		var tabMenu = {
			tab : document.getElementById(option.tabMenu.tab),
			tabTag : document.getElementById(option.tabMenu.tab).getElementsByTagName(option.tabMenu.tabTag)
		},
		tabTag = tabMenu.tabTag,
		i,
		deClass = tabTag[1].className, // 1번째 요소는... 대부분 className on이 붙어있는 경우 많다.
		reset = function() {for(i=0;i<tabTag.length;i++) {tabTag[i].className = deClass;}}
		for(i=0;i<tabTag.length;i++) {tabTag[i].rel = i;}
		for(i=0;i<tabTag.length;i++) {
			tabTag[i].onclick = function() {
				reset();
				this.className = deClass + " on";
				setOption.index = this.getAttribute("rel");
				setOption.animation();
			}
		}
		return tabMenu;
		} : null,
		animation : function() {
			var width = targetTag.getElementsByTagName("*")[0].offsetWidth,
			setWidth = setOption.index * width,
			ua = navigator.userAgent;
			if(ua.match("/MSIE 8.0/") === true && ua.match("/MSIE 9.0/") === true && ua.match("/MSIE 7.0/") === true) {
				var anime = setInterval(function() {
					/*
						1번째. Tab Menu Click (0 - 0 / 0 - 4)
						2번째. 정리... 힘들어....
					*/
					if(setOption.prIndex < setOption.index) {
						posX += option.speed;
						if(posX >= setWidth) {
							clearInterval(anime);
							setOption.prIndex = setOption.index;
						}
					} else {
						console.log(posX);
						posX = posX !== 0 ? posX - option.speed : 0;
						if(posX <= setWidth) {
							clearInterval(anime);
							setOption.prIndex = setOption.index;
						}
					}
					targetTag.style.left = "-" + posX + "px";
				},setOption.time)
			} else {
				targetTag.setAttribute("style", "left:-"+setWidth+"px;-webkit-transition:"+option.time+"s all ease-in; -moz-transition:"+option.time+"s all ease-in; -o-transition:"+option.time+"s all ease-in; transition:"+option.time+"s all ease-in")
			}
		}
	};
	if(option.tabMenu) {setOption.tabMenu();}
	return setOption;
}
// 실제 html파일에서 불러올 아이
var tabCarousel = new carousel("target", {
	speed : 5,
	time : 1,
	tabMenu : {tab:"tabMenu", tabTag:"a"}
});