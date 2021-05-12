// adding new chat documents 
// setting up a real-time listener to get new chats 
// updating the username
// updating the room 


class Chatroom{
    constructor(channel, username) {
        this.channel = channel
        this.username = username
        this.chats = db.collection('chats')
        this.unsub;
    }
    async addChat(message){
        // format a chat object 
        const now = new Date();
        const chat = {
            msg: message,
            username: this.username,
            channel: this.channel,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        // save the chat document 
        const response = await this.chats.add(chat)
        return response
    }
    getChats(callback){
        this.unsub = this.chats
            .where('channel', '==', this.channel)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update ui
                        callback(change.doc.data())
                    }
                })
            })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username)
    }
    updateChannel(channel){
        this.channel = channel;
        console.log('channel updated')
        if(this.unsub){
            this.unsub()
        }
    }
}

