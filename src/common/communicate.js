export default {
    post(command, payload) {
        let postData = {
            command: command,
            payload: payload
        }
        try{
            window.postMessage(JSON.stringify(postData));
        }catch(err){
            console.log(err);
        }
    },
    listen(cb) {
        window.addEventListener("message", (e) => {
            let data = e.data;
            if (typeof data === "string") data = JSON.parse(data);
            cb.call(this, data);
        })
    }
}
