import axios from 'axios'

// import io from 'socket.io-client/dist/socket.io';
// const socket = io('http://80.185.130.98:6000', {
//   transports: ['websocket'] // you need to explicitly tell it to use websockets
// });
// socket.connect();



module.exports.getUser = function (phoneNum){
    return new Promise ((resolve, reject) => {
        axios.get()
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data.userGettingMessage == "User successfully found by phone number.")
            {
                resolve(response.data.user);
            }
            else
                reject("Impossible de trouver cet utilisateur");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}

module.exports.getUserById = function (gId){
    return new Promise ((resolve, reject) => {
        axios.get()
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data.userGettingMessage == "User successfully found by phone number.")
            {
                resolve(response.data.user);
            }
            else
                reject("Impossible de trouver cet utilisateur");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}

module.exports.getUserSentTransactions = function (senderId, phoneNum){
    // alert(senderId+" "+phoneNum)
    return new Promise ((resolve, reject) => {
        axios.get()
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data.userTransactionsGettingMessage == "Transactions successfully found.")
            {
                let transactions = response.data.transactions
                transactions.forEach(transaction => {
                    // alert(JSON.stringify(transaction))
                    _getUser(transaction.recipientNum)
                    .then((user)=>{
                        transaction = {
                            ...transaction, 
                            recipientName : user.fname+" "+user.lname
                        }
                    })
                    .catch((error) => {
                        reject("Impossible de trouver les transactions de cet utilisateur");        
                    })
                });
                
                resolve(transactions);
            }
            else
                reject("Impossible de trouver les transactions de cet utilisateur");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}

module.exports.getUserReceivedTransactions = function (recipientId, phoneNum){
    // alert(senderId+" "+phoneNum)
    return new Promise ((resolve, reject) => {
        axios.get()
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data.userTransactionsGettingMessage == "Transactions successfully found.")
            {
                let transactions = response.data.transactions
                transactions.forEach(transaction => {
                    // alert(JSON.stringify(transaction))
                    _getUser(transaction.senderNum)
                    .then((user)=>{
                        transaction = {
                            ...transaction, 
                            sendertName : user.fname+" "+user.lname
                        }
                    })
                    .catch((error) => {
                        reject("Impossible de trouver les transactions de cet utilisateur");        
                    })
                });
                
                resolve(transactions);
            }
            else
                reject("Impossible de trouver les transactions de cet utilisateur");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}

function _getUser(phoneNum){
    return new Promise ((resolve, reject) => {
        axios.get()
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data.userGettingMessage == "User successfully found by phone number.")
            {
                resolve(response.data.user);
            }
            else
                reject("Impossible de trouver cet utilisateur");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}

module.exports.generateSecretCode = function(_tokenId, _senderId, _senderNum, _senderTag, _recipientId, _recipientNum, _recipientTag, _amountEur){
    return new Promise ((resolve, reject) => {
        axios.post('', 
        {
                      }
        )
        .then(function (response) {
            // alert(JSON.stringify(response))
            if(response.data == "Secret key sent to client")
            {
                resolve();
            }
            else if (response.data == "Sender has not sufficiant tokens")
                reject("Sender has not sufficiant tokens")
            else
                reject("Serveur indisponible. Veuillez essayer dans quelques instants");
            })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
        });
    })
}

module.exports.cashOut = function(_tokenId, _senderId, _senderNum, _senderTag, _recipientId, _recipientNum, _recipientTag, _amountEur, _key){
    return new Promise ((resolve, reject) => {
        axios.post('',
        {
                      }
        )
        .then(function (response) {
            resolve(response)
        })
        .catch(function (error) {
            reject("Serveur indisponible. Veuillez essayer dans quelques instants")
            console.log("Erreur. "+error);
        });
    })
}

