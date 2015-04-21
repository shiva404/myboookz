var exports = module.exports = {};
var config = require('./config');
var Client = require('node-rest-client').Client;

client = new Client();

function getArguments() {
    return {
//    data:{"name":"Jerald Reichert","email":"felipa.considine@gmail.com","lastModifiedDate":0,"addresses":[{"id":null,"addressType":"HOME","addressLine1":"653","addressLine2":"Suite 402","landmark":"landMark","city":"Lake town","state":"NY","country":"Ethiopia","zipCode":"20726-6718","createdDate":0,"lastModifiedTime":0}],"phone":"096.160.4570 x114","createdDate":0}, // data passed to REST method (only useful in POST, PUT or PATCH methods)
//    path:{"id":120}, // path substitution var
//    parameters:{arg1:"hello",arg2:"world"},
      headers: {"content-type": "application/json", "accept": "application/json"}
    };
}

var baseUrl = config.neo4jservice.baseurl;

client.registerMethod("createUser",  baseUrl + "/users", "POST"); //?accessToken=xyz
client.registerMethod("updateFields", baseUrl + "/users/${id}/fields", "PUT");
client.registerMethod("getUserFromFbId", baseUrl + "/users/fbId/${id}", "GET");
client.registerMethod("getUserFromId", baseUrl + "/users/${id}", "GET");
client.registerMethod("updateUser", baseUrl + "/users/${id}", "PUT");
client.registerMethod("addAddress", baseUrl + "/users/${userId}/addresses", "POST");
client.registerMethod("updateAddress", baseUrl + "/users/${userId}/addresses/${addressId}", "PUT");
client.registerMethod("deleteAddress", baseUrl + "/users/${userId}/addresses/${addressId}", "DELETE");

client.registerMethod("addBookToUser", baseUrl + "/users/${userId}/books/${bookId}/own", "POST");
client.registerMethod("addBookToWishListForUser", baseUrl + "/users/${userId}/books/${bookId}/wish", "PUT");
client.registerMethod("changeBookStatusOfOwnedBook", baseUrl + "/users/${userId}/books/${bookId}/OWN", "PUT");
client.registerMethod("getOwnedBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=owned
client.registerMethod("getAvailableBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=available
client.registerMethod("getLentBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=lent
client.registerMethod("getBorrowedBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=borrowed

client.registerMethod("getFollowersOfUser", baseUrl + "/users/${userId}/followers", "GET");
client.registerMethod("getFollowing", baseUrl + "/users/${userId}/following", "GET");

client.registerMethod("followUser", baseUrl + "/users/${userId}/follow/${followUserId}", "POST");
client.registerMethod("unFollowUser", baseUrl + "/users/${userId}/follow/${followUserId}", "DELETE");

client.registerMethod("saveFavourites", baseUrl + "/users/${userId}/favourites", "PUT");

//Book
//client.registerMethod("createBook", baseUrl + "/books", "POST");  --> Don't use this api
client.registerMethod("getBookById", baseUrl + "/books/${bookId}", "GET");
client.registerMethod("getBookByGoodreadsId", baseUrl + "/books/goodreadsId/${goodreadsId}", "GET");
client.registerMethod("getBookByIsbn", baseUrl + "/books/isbn/${isbn}", "GET");

client.registerMethod("borrowBook", baseUrl + "/books/${bookId}/borrow", "POST"); // -POST borrow request object

client.registerMethod("updateStatusToAgreed", baseUrl + "/books/${bookId}/user/${userId}", ""); // ?status=agreed&borrowerId=xyz - Which will lock the book for the exchange
client.registerMethod("updateStatusToSuccess", baseUrl + "/books/${bookId}/user/${userId}", ""); // ?status=success&borrowerId=xyz

exports.addAddress = function(address, userId, cb) {
    var args = getArguments();
    console.log("Neo4jClient -" + JSON.stringify(address)  + "UserId:" + userId);
    args.data = address;
    args.path = {userId: userId};
    client.methods.addAddress(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.updateAddress = function(addressId, address, userId, cb) {
    var args = getArguments();
    args.data = address;
    args.path = {addressId: addressId, userId: userId};
    client.methods.updateAddress(args,function(data,response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.deleteAddress = function(addressId, userId, cb) {
    var args = getArguments();
    args.path = {addressId: addressId, userId: userId};
    client.methods.deleteAddress(args,function(data,response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });        
}

exports.createUser = function(user, accessToken, cb){
    var args = getArguments();
    args.data = user;
    args.parameters = {"accessToken": accessToken};
    client.methods.createUser(args,function(data,response){
        if(response.statusCode != 201){
            cb(data, null)    
        } else{
            cb(null, data);    
        }
    });
};

exports.getUserFromFbId = function(fbId, cb) {
    var args = getArguments();
    args.path = {id: fbId};
    client.methods.getUserFromFbId(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }       
    });
};

exports.updateFields = function(fields, userId, cb) {
    var args = getArguments();
    args.path = {id: userId};
    args.data = fields;
    console.log("calling to save the fields with args:" + JSON.stringify(args));
    client.methods.updateFields(args, function(data, response){
        console.log(data);
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getUserFromId = function(id, cb) {
    var args = getArguments();
    args.path = {id: id};
    client.methods.getUserFromId(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }       
    });
};

exports.getAvailableBooks = function(id, cb) {
    var args = getArguments();
    args.path = {userId: id};
    args.parameters = {"filter": "owned"};
    client.methods.getAvailableBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getBookById = function (bookId, userId, cb) {
    var args = getArguments();
    args.path = {bookId: bookId};
    args.parameters = {"userId": userId};
    client.methods.getBookById(args, function (data, response) {
        if (response.statusCode != 200) {
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
}

exports.getOwnedBooks = function(id, cb) {
    var args = getArguments();
    args.path = {userId: id};
    args.parameters = {"filter": "owned"};
    client.methods.getOwnedBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getWishListBooks = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    args.parameters = {"filter": "wishList"};
    client.methods.getOwnedBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
}
