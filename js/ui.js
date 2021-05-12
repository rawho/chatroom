// render chat templates to the DOM 
// clear the list of chats (when the room changes)

class ChatUI {
    constructor(list) {
        this.list = list;
    }

    clear(){
        this.list.innerHTML = '';
    }

    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        )
        const html = `
        <div class="chat">
            <div class="user-dets">
                <img src="https://img.icons8.com/cotton/64/000000/user-male--v4.png"/>
                <p>${data.username}</p>
                
            </div>
            <p>${data.msg}</p>
            <p class="time">${when}</p>
        </div>
        `

        this.list.innerHTML += html
        this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight
    }
}