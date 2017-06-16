var paymentsCollection = require('../firebase/connectPaymentTable');
var usersCollection = require('../firebase/connectUsers');


var saveUserPaymentDetails = function(userId,aPaymentDetail){
  usersCollection.child(userId).child("paymentId").push().set({
    payId : aPaymentDetail.payment_id
  });
  paymentsCollection.child(aPaymentDetail.payment_id).set(aPaymentDetail);
}

module.exports = saveUserPaymentDetails;
