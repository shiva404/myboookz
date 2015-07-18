var exports = module.exports = {};
var config = require('./config');
var Client = require('node-rest-client').Client;

const OWNS_RELATION = "OWNS";
const BORROWED_RELATION = "BORROWED";
const CURRENTLY_READING_RELATION = "CURRENTLY_READING";
const ADDRESSES_RELATION = "addresses";
const GOODREADS_REC_RELATION = "GR_REC";
const READ_RELATION = "READ";
const REMINDER_RELATION = "REMINDER_ABOUT";
const ACTIVITY_RELATION = "ACTIVITY";
const USER_GROUP_RELATION = "USER_ACCESS";
const NOTIFICATION_RELATION = "NOTIFICATION";
const CONNECTED_RELATION = "CONNECTED";
const WISHLIST_RELATION = "WISH";

const FRIEND_REQ_SENT = "FRIEND_REQ_SENT";
const FRIEND_REQ_APPROVAL_PENDING = "FRIEND_REQ_APPROVAL_PENDING";
const ADDRESS_TYPE_HOME = "HOME";
const ADDRESS_TYPE_WORK = "WORK";
const ADDRESS_TYPE_OTHER = "OTHER";
const FRIEND_REQUEST_SENT_NOTIFICATION = "FRIEND_REQUEST_SENT";
const FRIEND_REQUEST_ACCEPTED_NOTIFICATION = "FRIEND_REQUEST_ACCEPTED";

const AVAILABLE = "AVAILABLE";
const PRIVATE = "PRIVATE";
//const
const OWNS = OWNS_RELATION;
const WISHLIST = WISHLIST_RELATION;
const READ = READ_RELATION;
const CURRENTLY_READING = CURRENTLY_READING_RELATION;
const LENT = "LENT";
const BORROWED = "BORROWED";
const BORROW_LOCK = "BORROW_LOCK";
const BORROW_IN_PROGRESS = "BORROW_IN_PROGRESS";

const ALL = "ALL";

const ID = "id";
const GR_ID = "grId";

const SELF = "SELF";

const BORROW_AGREED = "agreed";
const BORROW_SUCCESS = "success";
const BORROW_REJECT = "reject";

const RETURN_INIT = "init";
const RETURN_AGREED = "agreed";
const RETURN_SUCCESS = "success";

const ADDRESS_DELETED_EVENT = "ADDRESS_DELETED";

const FRIEND_REQUEST_CANCEL_DELETE = "FRIEND_REQUEST_CANCEL_DELETE";
const FRIEND_UNFRIEND_DELETE = "FRIEND_REQUEST_CANCEL_DELETE";

const STATUS = "status";

const ACCESS_TOKEN_QPARAM = "accessToken";
const IN_PROGRESS_GREADS_STATUS = "inProgress";
const FILTER_QPARAM = "filter";
const STATUS_QPARAM = STATUS;

const CREATED_BY_QPARAM = "createdBy";
const REMINDER_ABOUT_QPARM = "reminderAbout";
const FRESH_NOTIFICATION_TYPE = "fresh";
const SEARCH_QPARAM = "q";
const SIZE_QPARAM = "size";
const INCLUDE_FRIENDS_QPARAM = "includeFriends";

const LISTING_TYPE_QPARAM = "listingType";
const ID_TYPE_QPARAM = "idType";
const LOGGED_IN_USER_QPARAM = "loggedInUser";
const SHARE_PH_QPARAM = "sharePh";
const MESSAGE_QPARAM = "message";
const OWNER_USER_ID_QPARAM = "ownerUserId";
const BORROWER_ID_QPARAM = "borrowerId";

client = new Client();

client.on('error',function(err){
    
});

function getArguments() {
    return {
//    data:{"name":"Jerald Reichert","email":"felipa.considine@gmail.com","lastModifiedDate":0,"addresses":[{"id":null,"addressType":"HOME","addressLine1":"653","addressLine2":"Suite 402","landmark":"landMark","city":"Lake town","state":"NY","country":"Ethiopia","zipCode":"20726-6718","createdDate":0,"lastModifiedTime":0}],"phone":"096.160.4570 x114","createdDate":0}, // data passed to REST method (only useful in POST, PUT or PATCH methods)
//    path:{"id":120}, // path substitution var
//    parameters:{arg1:"hello",arg2:"world"},
      headers: {"content-type": "application/json", "accept": "application/json"}
    };
}

var baseUrl = config.neo4jservice.baseurl;

client.registerMethod("createUser",  baseUrl + "/users", "POST"); //?accessToken=xyz    //done
client.registerMethod("updateFields", baseUrl + "/users/${id}/fields", "PUT");          //done
client.registerMethod("getUserFromFbId", baseUrl + "/users/fbId/${id}", "GET");         //done
client.registerMethod("getUserFromId", baseUrl + "/users/${id}", "GET");                //done
client.registerMethod("getUserFromGoogleId", baseUrl + "/users/${googleId}/googleId", "GET");//done
client.registerMethod("updateUser", baseUrl + "/users/${id}", "PUT");
client.registerMethod("addAddress", baseUrl + "/users/${userId}/addresses", "POST");    //done
client.registerMethod("updateAddress", baseUrl + "/users/${userId}/addresses/${addressId}", "PUT"); //done
client.registerMethod("deleteAddress", baseUrl + "/users/${userId}/addresses/${addressId}", "DELETE");//done

client.registerMethod("createReminder", baseUrl + "/users/${userId}/reminders", "POST");                    //done
client.registerMethod("getReminder", baseUrl + "/users/${userId}/reminders/${reminderId}", "GET");          //done
client.registerMethod("listReminders", baseUrl + "/users/${userId}/reminders", "GET");                      //done
client.registerMethod("updateReminder", baseUrl + "/users/${userId}/reminders/${reminderId}", "PUT");       //done
client.registerMethod("deleteReminder", baseUrl + "/users/${userId}/reminders/${reminderId}", "DELETE");    //done

//APIS changed
client.registerMethod("addBookToUserAsOwn", baseUrl + "/books/${bookId}/users/${userId}", "POST"); //?listingType=OWN&status=AVAILABLE&idType=id
//clientr.egisterMethod("addBookToUserAsOwnByGrId", baseUrl + "/books/${bookId}/users/${userId}", "POST"); //?listingType=OWN&status=AVAILABLE&idType=grId

client.registerMethod("addBookToUserAsRead", baseUrl + "/books/${bookId}/users/${userId}", "POST"); //?listingType=READ&idType=id
//client.registerMethod("addBookToUserAsReadByGrId", baseUrl + "/books/${bookId}/users/${userId}", "POST"); //?listingType=READ&idType=grId

client.registerMethod("addBookToUserAsReadAndOwn", baseUrl + "/books/${bookId}/users/${userId}", "POST"); //?listingType=READ,OWN&idType=id&status=AVAILABLE
//client.registerMethod("addBookToUserAsReadAndOwnByGrId", baseUrl + "/books/${bookId}/users/${userId}", "POST"); //?listingType=READ,OWN&idType=id&status=AVAILABLE

client.registerMethod("addBookToWishListForUser", baseUrl + "/books/${bookId}/users/${userId}", "POST"); ////?listingType=WISH&idType=id
//client.registerMethod("addBookToWishListForUserByGrId", baseUrl + "/books/${bookId}/users/${userId}", "POST"); ////?listingType=WISH&idType=id

client.registerMethod("borrowBook", baseUrl + "/books/${bookId}/borrow", "POST"); // -POST borrow request object
client.registerMethod("updateStatusToAgreed", baseUrl + "/books/${bookId}/borrow", "PUT"); // ?status=agreed&ownerId=&borrowerId=xyz&sharephone=
client.registerMethod("updateStatusToSuccess", baseUrl + "/books/${bookId}/borrow", "PUT"); // ?status=agreed&ownerId=&borrowerId=xyz&sharephone=

//till here
client.registerMethod("getOwnedBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=owned         //done
client.registerMethod("getAvailableBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=available
client.registerMethod("getLentBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=lent
client.registerMethod("getBorrowedBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=borrowed
client.registerMethod("getReadBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=read
client.registerMethod("getWishListBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=wishList
client.registerMethod("getAllBooks", baseUrl + "/users/${userId}/books", "GET"); // ?filter=all
client.registerMethod("getWishListBooksRec", baseUrl + "/users/${userId}/books", "GET"); //filter=wish_rec

client.registerMethod("getFollowersOfUser", baseUrl + "/users/${userId}/followers", "GET");
client.registerMethod("getFollowing", baseUrl + "/users/${userId}/following", "GET");
client.registerMethod("getFriends", baseUrl + "/users/${userId}/friends", "GET");
client.registerMethod("getPendingFriends", baseUrl + "/users/${userId}/friends/pending", "GET");

client.registerMethod("followUser", baseUrl + "/users/${userId}/follow/${followUserId}", "POST");
client.registerMethod("addFriend", baseUrl + "/users/${currentUserId}/friend/${friendUserId}", "POST");
client.registerMethod("unFollowUser", baseUrl + "/users/${userId}/follow/${followUserId}", "DELETE");
client.registerMethod("confirmFrindReq", baseUrl + "/users/${userId}/friend/${friendUserId}", "PUT"); //?status=agreed
client.registerMethod("deleteFrindReq", baseUrl + "/users/${userId}/friend/${friendUserId}", "PUT"); //?status=cancel


client.registerMethod("saveFavourites", baseUrl + "/users/${userId}/favourites", "PUT");
//timeline and activity log
client.registerMethod("getUserTimeLineFeed", baseUrl + "/users/${userId}/timeline/feed", "GET");
client.registerMethod("getUserActityFeed", baseUrl + "/users/${userId}/timeline/events", "GET");
//Book
//client.registerMethod("createBook", baseUrl + "/books", "POST");  --> Don't use this api
client.registerMethod("getBookById", baseUrl + "/books/${bookId}", "GET");
client.registerMethod("getBookByGoodreadsId", baseUrl + "/books/goodreadsId/${goodreadsId}", "GET");
client.registerMethod("getBookByIsbn", baseUrl + "/books/isbn/${isbn}", "GET");
client.registerMethod("getBookRelatedToUser", baseUrl + "/books/${bookId}", "GET");
client.registerMethod("getBookByGrIdRelatedToUser", baseUrl + "/books/goodreadsId/${bookId}/users/${userId}", "GET");
//Groups
client.registerMethod("addGroup", baseUrl + "/groups", "POST");
client.registerMethod("getGroup", baseUrl + "/groups/${groupId}", "GET")
client.registerMethod("getGroupWithMembers", baseUrl + "/groups/${groupId}", "GET"); //?includeMembers=true
client.registerMethod("addMemberToGroup", baseUrl + "/groups/${groupId}/users/${userId}", "POST"); //?createdBy=xyz
client.registerMethod("getGroupsOfUser", baseUrl + "/users/${userId}/groups", "GET");
client.registerMethod("getGroupMembers", baseUrl + "/groups/${groupId}/users", "GET");
client.registerMethod("getGroupAvailableBooks", baseUrl + "/groups/${groupId}/books", "GET"); //?filter=available
client.registerMethod("getGroupWishListBooks", baseUrl + "/groups/${groupId}/books", "GET"); //?filter=lookingfor
client.registerMethod("searchToAddGroupMembers", baseUrl + "/groups/${groupId}/search/users", "GET") //?q=searchString
//search
client.registerMethod("searchBooks", baseUrl + "/books/search", "GET") //?q=xyz
client.registerMethod("searchUsers", baseUrl + "/users/${userId}/search", "GET") //?q=xyz
client.registerMethod("searchFriends", baseUrl + "/users/${userId}/search/friends", "GET") //?q=xyz
//funky
client.registerMethod("getRandomUsers", baseUrl + "/users/random", "GET") //?size=10

//notifications
client.registerMethod("getFreshNotifications", baseUrl + "/users/${userId}/notifications", "GET") //?filter=fresh
client.registerMethod("getAllNotifications", baseUrl + "/users/${userId}/notifications", "GET") //?filter=all
client.registerMethod("removeFreshNotifications", baseUrl + "/users/${userId}/notifications", "DELETE")

//get friends rec
client.registerMethod("getFriendsRec", baseUrl + "/users/${userId}/friends/rec", "GET") //?includeFriends=true&size=10


exports.getFriendsRecommendations = function(userId, includeFriends, size, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    if(!size)
        size = 10
    args.parameters = {includeFriends: includeFriends, size: size}
    client.methods.getFriendsRec(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })    
}

exports.removeFreshNotifications = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    client.methods.removeFreshNotifications(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}

exports.getAllNotifications = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    args.parameters = {filter: "all"};
    client.methods.getAllNotifications(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}

exports.getFreshNotifications = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    args.parameters = {filter: "fresh"};
    client.methods.getFreshNotifications(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}

exports.getFriends = function(userId, currentUserId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    args.parameters = {loggedInUser: currentUserId};
    client.methods.getFriends(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}

exports.getPendingFriends = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    client.methods.getPendingFriends(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}

exports.confirmFrindReq = function(currentUserId, friendId, cb) {
    var args = getArguments();
    args.path = {userId: currentUserId, friendUserId: friendId};
    args.parameters = {status:"agreed"}
    client.methods.confirmFrindReq(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.deleteFrindReq = function(currentUserId, friendId, cb) {
    var args = getArguments();
    args.path = {userId: currentUserId, friendUserId: friendId};
    args.parameters = {status:"cancel"}
    client.methods.deleteFrindReq(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.addFriend = function(currentUserId, friendId, cb) {
    var args = getArguments();
    args.path = {currentUserId: currentUserId, friendUserId: friendId};
    client.methods.addFriend(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.addBookToUserAsOwn = function(userId, bookId, idType, cb) {
    var args = getArguments();
    args.path = {userId: userId, bookId: bookId};
    args.parameters = {ID_TYPE_QPARAM:idType, LISTING_TYPE_QPARAM:OWNS}
    client.methods.addBookToUserAsOwn(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.addBookToUserAsRead = function(userId, bookId, idType, cb) {
    var args = getArguments();
    args.path = {userId: userId, bookId: bookId};
    args.parameters = {ID_TYPE_QPARAM:idType, LISTING_TYPE_QPARAM:READ}
    client.methods.addBookToUserAsRead(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.addBookToWishListForUser = function(userId, bookId, idType, cb) {
    var args = getArguments();
    args.path = {userId: userId, bookId: bookId};
    args.parameters = {ID_TYPE_QPARAM:idType, LISTING_TYPE_QPARAM:WISHLIST}
    client.methods.addBookToWishListForUser(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getGroupAvailableBooks = function(groupId, cb) {
    var args = getArguments();
    args.path = {groupId: groupId};
    args.parameters = {filter:"available"}
    client.methods.getGroupAvailableBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getGroupWishListBooks = function(groupId, cb) {
    var args = getArguments();
    args.path = {groupId: groupId};
    args.parameters = {filter:"lookingfor"}
    client.methods.getGroupWishListBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getGroupMembers = function(groupId, loggedInUser, cb) {
    var args = getArguments();
    args.path = {groupId: groupId};
    args.parameters = {loggedInUser: loggedInUser}
    client.methods.getGroupMembers(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getRandomUsers = function(size, userId, cb){
    var args = getArguments();
    args.parameters = {size:size, currentUserId:userId};
    client.methods.getRandomUsers(args, function (data, response) {
        if (response.statusCode != 200) {
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.searchFriends = function(userId, searchString, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    args.parameters = {q: searchString}
    client.methods.searchFriends(args, function (data, response) {
        if (response.statusCode != 200) {
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};
exports.searchBooks = function(searchString, cb) {
    var args = getArguments();
    args.parameters = {q: searchString}

    client.methods.searchBooks(args, function (data, response) {
        if (response.statusCode != 200) {
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.searchUsers = function(userId, searchString, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    args.parameters = {q: searchString}
    
    client.methods.searchUsers(args, function (data, response) {
        if (response.statusCode != 200) {
            
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getGroupsOfUser = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};

    client.methods.getGroupsOfUser(args, function (data, response) {
        if (response.statusCode != 200) {
            
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.addMemberToGroup = function(groupId, userId, currentUserId, cb) {
    var args = getArguments();
    args.path = {userId: userId, groupId: groupId};
    args.parameters = {createdBy: currentUserId, role:"READ"}

    client.methods.addMemberToGroup(args, function (data, response) {
        if (response.statusCode != 200) {
            
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}

exports.addGroup = function(group, userId, cb) {
    var args = getArguments();
    args.parameters = {userId:userId};
    args.data = group;
    client.methods.addGroup(args, function(data, response){
        if(response.statusCode != 200){
            
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getGroupWithMembers = function(groupId, userId, cb) {
    var args = getArguments();
    args.parameters = {includeMembers:true};
    args.path = {groupId: groupId};
    client.methods.getGroupWithMembers(args, function(data, response){
        if(response.statusCode != 200){
            
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.searchToAddGroupMembers = function(groupId, searchString, loggedInUser, cb) {
    var args = getArguments();
    args.parameters = {q:searchString, loggedInUser:loggedInUser};
    args.path = {groupId: groupId};
    client.methods.searchToAddGroupMembers(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.getGroup = function(groupId, cb) {
    var args = getArguments();
    args.path = {groupId: groupId};
    client.methods.getGroup(args, function(data, response){
        if(response.statusCode != 200){
            
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
};

exports.followUser = function(currentUser, followUserId, cb) {
    var args = getArguments();
    

};

exports.getUserTimeLineFeed = function(userId, cb) {
    var args = getArguments();
    args.path = {userId:userId};
    client.methods.getUserTimeLineFeed(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getUserActityFeed = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    client.methods.getUserActityFeed(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.addAddress = function(address, userId, cb) {
    var args = getArguments()
    
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

exports.bookSearch = function(searchString, userId, cb) {
    var args = getArguments();
    args.parameters = {q: searchString, userId: userId}
    client.methods.searchBooks(args, function(books, response){
        if(response.statusCode != 200){
            cb(books, null);
        } else {
            cb(null, books);
        }
    });
};

exports.updateStatusToAgreed = function(borrowerId, ownerId, bookId, sharephone, comment, cb){
    var args = getArguments();
    args.data = {ownerUserId: ownerId, borrowerUserId: borrowerId, additionalMessage: comment}
    args.path = {bookId: bookId, userId: ownerId};
    args.parameters = {status: 'agreed', borrowerId: borrowerId, sharePh: sharephone}
    client.methods.updateStatusToAgreed(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
    
};

exports.initiateBorrowBookReq = function(borrowerId, ownerId, bookId, cb) {
    var args = getArguments();
    args.data = {ownerUserId: ownerId, borrowerUserId: borrowerId}
    args.path = {bookId: bookId}
    client.methods.borrowBook(args, function(data, response){
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

exports.addReminderForTargetUser = function(targetUserId, reminder, createdBy, reminderType,cb) {
    var args = getArguments();
    
    args.data = reminder;
    args.path = {userId: targetUserId};
    args.parameters = {createdBy:createdBy, reminderType: reminderType}
    client.methods.createReminder(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.updateReminder = function(targetUserId, reminder, reminderId, cb) {
    var args = getArguments();
    args.data = reminder;
    args.path = {reminderId: reminderId, userId: targetUserId};
    client.methods.updateReminder(args,function(data,response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.deleteReminder = function(userId, reminderId, cb) {
    var args = getArguments();
    args.path = {reminderId: reminderId, userId: userId};
    client.methods.deleteReminder(args,function(data,response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });        
}

exports.listRemindersForUser = function(userId, cb) {
    var args = getArguments();
    args.path = {userId: userId};
    client.methods.listReminders(args,function(data,response){
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
exports.getUserFromGoogleId = function(googleId, cb) {
    var args = getArguments();
    args.path = {googleId: googleId};
    client.methods.getUserFromGoogleId(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, response.statusCode, null);
        } else {
            cb(null, null, data);
        }
    });
};

exports.updateFields = function(fields, userId, cb) {
    var args = getArguments();
    args.path = {id: userId};
    args.data = fields;
    
    client.methods.updateFields(args, function(data, response){
        
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
    args.parameters = {"filter": AVAILABLE};
    client.methods.getAvailableBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getBookById = function (bookId, cb) {
    var args = getArguments();
    args.path = {bookId: bookId};
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
    args.parameters = {"filter": "owns"};
    client.methods.getOwnedBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getBorrowedBooks = function(id, cb) {
    var args = getArguments();
    args.path = {userId: id};
    args.parameters = {"filter": "borrowed"};
    client.methods.getBorrowedBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getReadBooks = function(id, cb) {
    var args = getArguments();
    args.path = {userId: id};
    args.parameters = {"filter": "read"};
    client.methods.getReadBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getWishListBooksRec = function(id, cb) {
    var args = getArguments();
    args.path = {userId: id};
    args.parameters = {"filter": "wish_rec"};
    client.methods.getWishListBooksRec(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getAllBooks = function(id, cb) {
    var args = getArguments();
    args.path = {userId: id};
    args.parameters = {"filter": "all"};
    client.methods.getReadBooks(args, function(data, response){
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
    client.methods.getWishListBooks(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    });
};

exports.getBookRelatedToUser = function(bookId, userId, cb) {
    console.log("calling 0-----> getBookRelatedToUser"+ bookId)
    var args = getArguments();
    args.path = {bookId:bookId}
    if(userId)
        args.parameters = {"loggedInUser":userId}
    client.methods.getBookRelatedToUser(args, function(data, response){
        if(response.statusCode != 200){
            console.log("error "+ data)
            cb(data, null);
        } else {
            console.log("went fine data "+ data)
            cb(null, data);
        }
    })
}

exports.getBookByGrIdRelatedToUser = function(bookId, userId, cb) {
    var args = getArguments();
    args.path = {userId: userId, bookId: bookId}
    client.methods.getBookByGrIdRelatedToUser(args, function(data, response){
        if(response.statusCode != 200){
            cb(data, null);
        } else {
            cb(null, data);
        }
    })
}
