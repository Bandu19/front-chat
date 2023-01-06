import { animateScroll } from "react-scroll"

export const scrollToBottom = (id ) => {

    setTimeout(()=>{
        animateScroll.scrollToBottom(id, {
            containerId: id,
            duration: 0,
            delay: 0,
            smooth: true,
            offset: 50,
            isDynamic: true
        })
    },1)
    // animateScroll.scrollToBottom({
    //     containerId: id,
    //     duration: 0
    // })
}

export const scrollToBottomAnimated = (id) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    })
}