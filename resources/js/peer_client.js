/**
 * Código de quem vai visualizar a transmissão
 */

const clientId = uuidv4()
let browserGlobal = checkBrowser()
import io from "socket.io-client"
let socket = null
let time = 0
let friendsVideo = document.getElementById("clientSideAnalistVideo")

let servers = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19305'
        },
        {
            urls: "stun:stun1.l.google.com:19305"
        },
        {
            urls: "stun:stun2.l.google.com:19305"
        },
        {
            urls: "stun:stun3.l.google.com:19305"
        }
    ]
};

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


let pc = new RTCPeerConnection(servers);

pc.onicecandidate = event => {
    if (event.candidate) {
        // socket.emit(
        //     "sendClientICE",
        //     JSON.stringify({
        //         ice: event.candidate
        //     })
        // );
    } else {
    }
};


let streamRemoteSave = null;

$("#playImage").click(function () {
    $("#playImage").fadeOut();
    let tryVideo = setInterval(function () {
        if (streamRemoteSave) {
            friendsVideo.srcObject = streamRemoteSave;
            clearInterval(tryVideo);
        } else {
            //console.log("tentando")
        }
    }, 500);
});


pc.onaddstream = event => {
    if (event.stream) {
        streamRemoteSave = event.stream;
        //friendsVideo.srcObject = event.stream
        if (browserGlobal == "Firefox") {
            friendsVideo.srcObject = event.stream;
        }
    }
};


setTimeout(function () {
    socket.emit("INeedAnalistOffer", clientId);
}, 500);



function checkBrowser() {
    let c = navigator.userAgent.search("Chrome");
    let f = navigator.userAgent.search("Firefox");
    let m8 = navigator.userAgent.search("MSIE 8.0");
    let m9 = navigator.userAgent.search("MSIE 9.0");
    let browser;
    if (c > -1) {
        browser = "Chrome";
    } else if (f > -1) {
        browser = "Firefox";
    } else if (m9 > -1) {
        browser = "MSIE 9.0";
    } else if (m8 > -1) {
        browser = "MSIE 8.0";
    }
    return browser;
}


function connectSocket() {
    if (!socket) {
        socket = io(BASEURL).connect();
    }
    socket.on("connect", function () {
        socket.emit("join-in-room", {
            token,
            slug
        });
        //const clientID = socket.id;
    });
}

connectSocket();

if (socket) {

    socket.on("sendAnalistOfferToClient", data => {
        var msg = data
        msg = JSON.parse(msg)

        if (time == 0) {
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() => pc.createAnswer())
                .then(answer => pc.setLocalDescription(answer))
                .then(() =>
                    socket.emit(
                        "sendClientSDP",
                        JSON.stringify({
                            clientId: msg.clientId,
                            sdp: pc.localDescription
                        })
                    )
                );
            time = 1;
        }
    });

    socket.on("receiveAnalistICE", function (data) {
        let msg = JSON.parse(data);
        pc.addIceCandidate(new RTCIceCandidate(msg.ice));
    });

}