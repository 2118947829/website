let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    loginForm.classList.remove('active');
}

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});
// var swiper1 = new Swiper(".review-slider", {
//     spaceBetween: 10,
//     loop: true,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     breakpoints: {
//         640: {
//             slidesPerView: 1,
//         },
//         768: {
//             slidesPerView: 2,
//         },
//         1024: {
//             slidesPerView: 3,
//         },
//     },
// });

// var swiper2 = new Swiper(".brand-slider", {
//     spaceBetween: 20,
//     loop: true,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     breakpoints: {
//         450: {
//             slidesPerView: 2,
//         },
//         768: {
//             slidesPerView: 3,
//         },
//         991: {
//             slidesPerView: 4,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//     },
// });

// 补充
/*
 * 
 * distance用来记录每次轮播时的偏移量
 * prePos用来记录轮播图最左边元素的Index
 * downPos用来记录mousedown时鼠标的clientX
 * flag用来记录窗口移动的方向，true向左，false向右
 * 
 * 
 * 
 */
var wrapper, slides, container, downPos, prePos, timeID, num;
init();

function init() {
    prePos = 0;
    flag = true;
    wrapper = document.querySelector('.wrapper')
    slides = document.getElementsByClassName('slide')
    container = document.querySelector('.container')
    num = slides.length;
    let firstNode = slides[0].cloneNode(true);
    let secondNode = slides[1].cloneNode(true);
    wrapper.appendChild(firstNode);
    wrapper.appendChild(secondNode);
    distance = slides[0].clientWidth;
    //初始化处理
    //根据slide的多少动态设置wrapper的宽度
    wrapper.style['width'] = slides.length * distance + 'px';
    container.style.width = 3 * distance + 'px';
    //wrapper.style.left = -distance + 'px';
    //console.log(wrapper.style);

    timeID = setInterval(move, 3000);
    wrapper.addEventListener('mousedown', handelMouseDown, true);
    wrapper.addEventListener('mouseenter', handleMouseenter);
    wrapper.addEventListener('mouseleave', handleMouseleave);
}

function move() {
    updateClassName(prePos, 'slide')
    updateClassName(prePos + 1, 'slide')
    updateClassName(prePos + 2, 'slide')
    if (flag) {

        if (prePos === slides.length - 3) {
            prePos = 0;
        } else {
            prePos++;
        }
    } else {

        if (prePos === 0) {
            prePos = slides.length - 3;
        } else {
            prePos--;
        }
    }
    //console.log(prePos);
    wrapper.style.left = -prePos * distance + 'px';
    console.log(prePos);
    updateClassName(prePos, 'slide pre-slide')
    updateClassName(prePos + 1, 'slide cur-slide')
    updateClassName(prePos + 2, 'slide next-slide')
}

function updateClassName(pos, name) {
    switch (pos) {
        case 0:
        case slides.length - 2:
            console.log(name);
            slides[0].className = slides[slides.length - 2].className = name
            break;
        case 1:
        case slides.length - 1:
            slides[1].className = slides[slides.length - 1].className = name
            break;
        default:
            slides[pos].className = name;
            break;
    }
}

function handelMouseUp(e) {
    //console.log(e.clientX);
    if (e.clientX < downPos) {
        //console.log('左');
        flag = true;
    } else if (e.clientX > downPos) {
        //console.log('右');
        flag = false;
    }
    move();
}

function handleMouseenter(e) {
    //console.log('enter');

    clearInterval(timeID);
}

function handleMouseleave() {
    //console.log('leave');
    flag = true;
    timeID = setInterval(move, 3000)
}

function handelMouseDown(e) {
    //console.log(e.target);
    //此处解决连续对同一个sliede的mousedown和mouseup使用一次后失效的问题
    //原因：
    //触发了浏览器的 drag 操作，导致mouseup丢失。
    //由于鼠标离开了操作的区域，触发了mouseleave导致mouseup丢失。
    e.preventDefault(); //我可能遇到的是第一种情况
    //e.stopPropagation();
    downPos = e.clientX;
    wrapper.addEventListener('mouseup', handelMouseUp);
}

