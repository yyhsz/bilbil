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

//轮播图
const mySwiper = new Swiper('.hotBox .swiper-container', {
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