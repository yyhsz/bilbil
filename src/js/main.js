//防抖
function debounce(fn,delay=100){
    let timer = setTimeout(fn,delay)

}

//游戏中心，右侧悬浮图展示功能
const list = $('.right>ul')
const img = $('.game-img>img')
list.on('mouseover', (e) => {
    if (e.target.tagName === 'LI' && $(e.target).attr('game-img')) {
        $('.game-img').css('display', 'block')
        img.attr('src', $(e.target).attr('game-img'))
    }
})
//登录盒子弹幕移动功能
//实现1，出现了明显的bug
//bug描述见思否
// const registerBox = $('.register-box')
// const wrapper = $('.wrapper')[0] //拿到HTML元素
// const move = () => {
//     wrapper.style.transform = `translateX(-320px)`
//     wrapper.style.transition = `transform 3s linear`
//     $(wrapper).on('transitionend', (e) => {
//         wrapper.style.transition = `transform 0s`
//         wrapper.style.transform = `translateX(0)`
//         $(wrapper).unbind('transitionend')
//     })
// }
// let timer
// registerBox.on('mouseenter', (e) => {
//     setTimeout(move, 0) 
//     timer = setInterval(move, 3000)
// })
// registerBox.on('mouseleave', (e) => {
//     clearInterval(timer)
// })


//实现2
const registerBox = $('.register-box')
const wrapper = $('.wrapper')[0] //拿到HTML元素
let step = 0
const move = () => {
    if (step >= 320) {
        step = 0
        wrapper.style.transform = `translateX(${step}px)`
        return
    }
    step += 2
    wrapper.style.transform = `translateX(${-step}px)`
}
let timer
registerBox.on('mouseenter', (e) => {
    timer = setInterval(move, 17)
})
registerBox.on('mouseleave', (e) => {
    clearInterval(timer)
})

//轮播图1
const mySwiper1 = new Swiper('.main-slide.swiper-container', {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});

//用ajax的发布订阅实现动态渲染轮播内容
const plan = $.Callbacks()
const recommandBoxWrapper = $('.recommand-box .swiper-wrapper')
$.ajax({
    url: '../../group.json',
    method: 'get',
    dataTyle: 'json',
    success: function (result) {
        //  从服务器获取数据，数据请求成功后，触发回调函数执行，result就是我们获取到的数据
        plan.fire(result); //通知计划表中的方法执行，并且把result值传递给每个方法
    }
});
let str = ''
plan.add((result) => {
    const ulNum = result.length / 6
    for (let i = 0; i < ulNum; i++) {
        const data = [...result].slice(i * 6, (i + 1) * 6)
        const data1 = data.slice(0, 3)
        const data2 = data.slice(3)
        str += `<div class="swiper-slide">
            <ul>
                ${data1.map((ele) => {
            return `<li>
                                <a href="${ele.link}" target="_blank">
                                <img src="${ele.pic}" alt="">
                                <p>${ele.title}</p>
                                </a>
                            </li>`
        }).join('')}
            </ul>
            <ul>
            ${data2.map((ele) => {
            return `<li>
                            <a href="${ele.link}" target="_blank">
                            <img src="${ele.pic}" alt="">
                            <p>${ele.title}</p>
                            </a>
                        </li>`
        }).join('')}
            </ul>
        </div>`
    }
    //将内容渲染到html
    recommandBoxWrapper.html(str)
    //必须在内容生成后创建swiper对象
    //轮播图2
    const mySwiper2 = new Swiper('.recommand-box.swiper-container', {
        loop: true, // 循环模式选项
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})

//移动到视频上方出现跟随幻灯片效果
const slideBox = Array.from($('.slide-box'))
const width = $(slideBox[0]).width()
const height = $(slideBox[0]).height()
const progress = Array.from($('.progress span i'))
const totalNum = 46 //真实开发中这个数据从服务器获取
console.log(progress);
slideBox.forEach((ele, index) => {
    const $ele = $(ele)
    //根据不同totalNum算出slide图片的大小
    $ele.on('mousemove', (e) => {
        let ratio = (e.pageX - $ele.offset().left) / width
        $(progress[index]).css({ width: 100 * ratio + '%' })
        //判断ratio对应的第几张图
        const num = Math.round(ratio * totalNum) < 1 ? 1 : (Math.round(ratio * totalNum) === totalNum ? totalNum : Math.round(ratio * totalNum))
        //n为行 m为列
        let n, m
        if (num <= 10) {
            n = 1
            m = num
        } else {
            n = Math.ceil(num / 10)
            m = num % 10
        }
        $ele.find('.slide').css({
            backgroundPositionX: -(n - 1) * height,
            backgroundPositionY: -(m - 1) * width
        })
    })
})

