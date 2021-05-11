/**
 * aqui ficará o código de quem vai transmitir o video
 */


import io from "socket.io-client";

let socket = null
let analistVideo = document.getElementById("analist_video")
let saveActiveStream = null
var myConnections = []
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


navigator.mediaDevices
    .getUserMedia({
        audio: true,
        video: true
    })
    .then(stream => {
        analistVideo.srcObject = stream;
        saveActiveStream = stream;
    });


connectSocket()

 
function connectSocket() {
    if (!socket) {
        socket = io(BASEURL).connect();
    }

    socket.on("connect", function () {
        const analistID = socket.id

        
        console.log("analist id" + analistID)
        // socket.emit(
        //     "registerAnalist",
        //     JSON.stringify({
        //         token
        //     })
        // );

        socket.emit(
            "register_analist",
            JSON.stringify({
                token
            })
        );

    });
}


/**
 * gero a oferta
 */
socket.on("generateAnalistOffer", function (clientId) {
    console.log("gerando ofertaaaa")

    let pc = myConnections[clientId]
    if (pc) {
        //disconnectPeerByClientSocketID(clientId)
    }

    myConnections[clientId] = new RTCPeerConnection(servers);
    pc = myConnections[clientId];
    pc.onicecandidate = event => {
        if (event.candidate) {
            socket.emit(
                "sendAnalistICE",
                JSON.stringify({
                    clientId: clientId,
                    ice: event.candidate
                })
            );
        } else {}
    };

    pc.addStream(saveActiveStream);

    setTimeout(async function () {
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .then(() => {
                socket.emit(
                    "sendNewAnalistOffer",
                    JSON.stringify({
                        clientId: clientId,
                        sdp: pc.localDescription,
                        slug
                    })
                );
            });
    }, 1000);

});

socket.on("receiveClientSDP", function (data) {
    let msg = JSON.parse(data);
    let pc = myConnections[msg.clientId];
    pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
});

