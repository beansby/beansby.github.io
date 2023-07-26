// 페이지 전환
window.addEventListener('DOMContentLoaded', ()=>{
	const sections = document.querySelectorAll('section');
	const prevButton = document.getElementById('prev-page');
	const nextButton = document.getElementById('next-page');
	const numberElement = document.getElementById('number');
	let currentSectionIndex = 0;

	prevButton.addEventListener('click', () => {
		currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
		updateCurrentSection();
	});

	nextButton.addEventListener('click', () => {
		currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
		updateCurrentSection();
	});

	// a 태그를 클릭하여 섹션으로 이동할 때 섹션 넘버 업데이트
	const projectButtons = document.querySelectorAll('.project-button');
	projectButtons.forEach((button, index) => {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			const href = button.getAttribute('href');
			const targetSection = document.querySelector(href);
			if (targetSection) {
				currentSectionIndex = Array.from(sections).indexOf(targetSection);
				// targetSection.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the clicked section
				updateCurrentSection();
			}
		});
	});

	//섹션 번호 업데이트 
	function updateCurrentSection() {
		sections.forEach((section, index) => {
			if (index === currentSectionIndex) {
				section.scrollIntoView({ behavior: 'smooth' });
				if (index == 1) {
					// 섹션 2일 때 버튼 스타일 변경
					prevButton.innerHTML = '<img src="./img/arrow-top-white.svg" alt="">';
					nextButton.innerHTML = '<img src="./img/arrow-bottom-white.svg" alt="">';
					numberElement.style.color = '#fff';
				} else {
					// 다른 섹션일 때 버튼 스타일 원래대로
					prevButton.innerHTML = '<img src="./img/arrow-top-black.svg" alt="">';
					nextButton.innerHTML = '<img src="./img/arrow-bottom-black.svg" alt="">';
					numberElement.style.color = '#000';
				}
			}
		});

		const currentSectionNumber = currentSectionIndex + 1;
		numberElement.textContent = currentSectionNumber.toString().padStart(2, '0');
	}

	// Intersection Observer를 이용하여 스크롤 시 섹션 넘버 수정
	const options = {
		threshold: 0.5 // 섹션이 뷰포트에 50% 이상 보일 때 이벤트 발생
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const index = Array.from(sections).indexOf(entry.target);
				const isInViewport = entry.intersectionRatio >= 0.5;
				if (isInViewport) {
					currentSectionIndex = index;
					updateCurrentSection();
				} else {
					// 만약 교차 영역이 50% 미만으로 떨어지면 이전 섹션으로 돌아가기
					if (index > 0) {
						currentSectionIndex = index - 1;
						updateCurrentSection();
					}
				}
			}
		});
	}, options);

	sections.forEach(section => {
		observer.observe(section);
	});

})

// 전광판 효과
window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#roller1').style.left = '0px';
	document.querySelector('#roller2').style.left = document.querySelector('.roller ul').offsetWidth+'px';

	window.addEventListener('resize', () => {
		console.log("resize");
		document.querySelector('#roller1').style.left = '0px';
		document.querySelector('#roller2').style.left = document.querySelector('.roller ul').offsetWidth+'px';
			
	})
})

// project description
window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.description-wrapper').forEach((button)=>{
		button.addEventListener("click", (event)=>{
			const dots = document.querySelectorAll('.slick-dots li button');
			let info = button.nextElementSibling;
			
			if (info.style.opacity == 0) {
				info.style.opacity = "1";
				dots.forEach((element)=>{
					element.setAttribute("style", "display:none;");
				})
			} else if (info.style.opacity == 1) {
				info.style.opacity = "0";
				dots.forEach((element)=>{
					element.removeAttribute("style");
				})
			}
		})
	})
})

// image swiper
$(document).ready(function() {
  $('.slick-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="./img/left-arrow.svg" alt="left"/></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="./img/right-arrow.svg" alt="right"/></button>',
  });

	function removeNumber(){
		const dotButton = document.querySelectorAll('.slick-dots li button');
		dotButton.forEach(button => {
			button.innerHTML = ''; // innerHTML을 빈 문자열로 설정
		});
	}

	removeNumber();
});


// section 6
window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.site-button').forEach((button)=>{
		button.addEventListener("mouseover", (event)=>{
			document.querySelectorAll("#move").forEach((element)=>{
				element.removeAttribute("id");
			})
			let icon = button.querySelector("svg");
			icon.setAttribute("id","move");
		})

		button.addEventListener("mouseout", (event)=>{
			document.querySelectorAll("#move").forEach((element)=>{
				element.removeAttribute("id");
			})
		})
	})
})