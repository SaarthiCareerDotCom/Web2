var firebase = require('../../common/firebase-config');
var constants = require('../../common/constants');
var couponsCollection = firebase.database().ref('saarthi').child('coupons');

var isValid = function(originalCouponValidity){
  var formatedDate = originalCouponValidity.split('/');
  var originalCouponDate = formatedDate[1]+"/"+formatedDate[0]+"/"+formatedDate[2];
  return Date.now() < (new Date(originalCouponDate).getTime());
}

var getCouponDetails = function(couponCode,callback){
  couponsCollection.orderByChild("code").equalTo(couponCode).once("value", function(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();
    if(data){
      var key = Object.keys(data);
      console.log(key);
      var percentage = data[key]["percentage"];
      var quantity = data[key]["quantity"];
      var validity = data[key]["validity"];
      if( (quantity > 0 || quantity == -1) && isValid(validity)){
        console.log('coupon verified');
        callback(200,percentage,{"message" : "coupon applied"});
      }
      else{
        callback(400,'0',{"message" : "coupon not valid"});
      }
    }
    else callback(400,'0',{"message" : "coupon does not exist"});
  });

};

var updateCouponQuantity = function(couponCode){
  couponsCollection.orderByChild("code").equalTo(couponCode).once("value", function(snapshot) {
    var data = snapshot.val();
    if(data){
      var key = Object.keys(data);
      // console.log(key.join(' '));
      var quantity = data[key]["quantity"];
      console.log(data);
      if(quantity > 0){
        couponsCollection.child(key.toString()).update({
          "quantity" : quantity -1
        });
      }
    }
  });
};

module.exports = {
    'getCouponDetails' : getCouponDetails,
    'updateCouponQuantity' : updateCouponQuantity
}
