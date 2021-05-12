// dom queries
const chatList = document.querySelector('.chats')
const newChatForm = document.querySelector('.new-chat-form')
const newNameForm = document.querySelector('.update-username')
const updateMsg = document.querySelector('.update-msg')
const channels = document.querySelector('.buttons')

// add a new chat 
newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    const msg = newChatForm.msg.value.trim()
    chatroom.addChat(msg)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
})

// update username 
newNameForm.addEventListener('submit', e => {
    e.preventDefault()
    // update name via chatroom 
    const newName = newNameForm.name.value.trim()
    chatroom.updateName(newName)

    // reset the form
    newNameForm.reset()

    // show then hide the update msg 
    updateMsg.innerHTML = `
    <p> Your name was updated to ${newName} </p>
    `
    setTimeout(() => {
        updateMsg.innerHTML = ``
    }, 3000)

})

// update the channel 
channels.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'))
        e.target.classList.toggle('active')
        chatUI.clear();
        chatroom.updateChannel(e.target.getAttribute('id'))
        chatroom.getChats(chat => {
            chatUI.render(chat)
        })

    }
})

// check local storage for a name 
const username = localStorage.username ? localStorage.username : 'anonymous'

// class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username)

// get chats and render
chatroom.getChats(data => chatUI.render(data))

