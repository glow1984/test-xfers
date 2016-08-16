var http = require('http');
var https = require('https');

var express        =        require('express');
var bodyParser     =        require('body-parser');
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//1. Signup_login
app.post('/signup_login', function(requ, resp) {
	
	var crypto = require('crypto')	, shasum = crypto.createHash('sha1');
		shasum.update(requ.body.phone_no+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	hash =shasum.digest('hex')
	
	//console.log(requ.body.phone_no+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	//console.log(hash);

	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/authorize/signup_login',
	  method: 'POST',
	  headers: {
		'X-XFERS-APP-API-KEY': requ.get('X-XFERS-APP-API-KEY'),
		'Content-Type': 'application/json'
	  }
	};

	var data = JSON.stringify({
		'phone_no': requ.body.phone_no,
		'signature': hash
	});

	var req = https.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  res.on('data', function(chunk) {
		msg += chunk;
	  });
	  res.on('end', function() {
		console.log(JSON.parse(msg));
		resp.send(JSON.parse(msg));
	  });
	});

	req.write(data);
	req.end();
	
	/*var newQuote = {
		phone_no : requ.body.phoneNo,
		signature : requ.body.signature
	}; 
	data.push(newQuote);
	resp.json(true);*/
});

//2. Get_token
app.get('/get_token', function (requ, resp) {
	
	var crypto = require('crypto')
	, shasum = crypto.createHash('sha1');
	
	shasum.update('+'+requ.query.phone_no+requ.query.otp+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	hash =shasum.digest('hex')
	
	console.log('+'+requ.query.phone_no+requ.query.otp+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	console.log(hash);
  
	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/authorize/get_token?otp='+requ.query.otp+'&phone_no=%2B'+requ.query.phone_no+'&signature='+hash,
	  method: 'GET',
	  headers: {
		'X-XFERS-APP-API-KEY': requ.get('X-XFERS-APP-API-KEY')
	  }
	};
  
  var req = https.request(options, function(res) {
  var msg = '';

  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    msg += chunk;
  });
  res.on('end', function() {
    console.log(JSON.parse(msg));
	resp.send(JSON.parse(msg));
  });
  
});

//req.write(data);
req.end();


});


//3. Charges
app.post('/charges', function(requ, resp) {
	
	/*var crypto = require('crypto')
	, shasum = crypto.createHash('sha1');
		shasum.update(requ.body.phone_no+'insTP7SnyMttf--BzaMi91zeRQqJ7qHzxL9A_XvLQFw');
	hash =shasum.digest('hex')*/
	
	//console.log(requ.body.phone_no+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	//console.log(hash);

	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/charges',
	  method: 'POST',
	  headers: {
		'X-XFERS-USER-API-KEY': requ.get('X-XFERS-USER-API-KEY'),
		'Content-Type': 'application/json'
	  }
	};

	var data = JSON.stringify({
		'amount': requ.body.amount,
		'currency': 'SGD',
		'order_id': requ.body.order_id,
		'description': requ.body.description,
		'return_url': 'www.krib.co',
		'cancel_url': 'www.krib.co',
		'refundable': 'false',
		'user_api_token': requ.body.user_api_token,
		'user_phone_no': requ.body.user_phone_no,
		'redirect': 'false',
		'receipt_email': requ.body.receipt_email,
		'card_only' : requ.body.card_only,
		'notify_url' : 'https://test-xfers.herokuapp.com/payment_notification/'
	});

	var req = https.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  res.on('data', function(chunk) {
		msg += chunk;
	  });
	  res.on('end', function() {
		console.log(JSON.parse(msg));
		resp.send(JSON.parse(msg));
	  });
	});

	req.write(data);
	req.end();
	
	/*var newQuote = {
		phone_no : requ.body.phoneNo,
		signature : requ.body.signature
	}; 
	data.push(newQuote);
	resp.json(true);*/
});


//4. Retrieve_charges
app.get('/retrieve_charge', function (requ, resp) {
  
	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: 'https://sandbox.xfers.io/api/v3/charges/'+requ.query.charge_id,
	  method: 'GET',
	  headers: {
		'X-XFERS-USER-API-KEY': requ.get('X-XFERS-USER-API-KEY')
	  }
	};
  
  var req = https.request(options, function(res) {
  var msg = '';

  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    msg += chunk;
  });
  res.on('end', function() {
    console.log(JSON.parse(msg));
	resp.send(JSON.parse(msg));
  });
  
});

//req.write(data);
req.end();


});


//5. Payouts
app.post('/payouts', function(requ, resp) {
	
	/*var crypto = require('crypto')
	, shasum = crypto.createHash('sha1');
		shasum.update(requ.body.phone_no+'insTP7SnyMttf--BzaMi91zeRQqJ7qHzxL9A_XvLQFw');
	hash =shasum.digest('hex')*/
	
	//console.log(requ.body.phone_no+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	//console.log(hash);

	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/payouts',
	  method: 'POST',
	  headers: {
		'X-XFERS-USER-API-KEY': requ.get('X-XFERS-USER-API-KEY'),
		'Content-Type': 'application/json'
	  }
	};

	var data = JSON.stringify({
		'amount': requ.body.amount,
		'invoice_id': requ.body.invoice_id,
		'recipient': requ.body.recipient,
		'user_api_token': requ.body.user_api_token,
		'currency': 'SGD',
		'descriptions': requ.body.descriptions,
		'bank_abbreviation': requ.body.bank_abbreviation,
		'bank_account_no': requ.body.bank_account_no
	});

	var req = https.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  res.on('data', function(chunk) {
		msg += chunk;
	  });
	  res.on('end', function() {
		console.log(JSON.parse(msg));
		resp.send(JSON.parse(msg));
	  });
	});

	req.write(data);
	req.end();
	
	/*var newQuote = {
		phone_no : requ.body.phoneNo,
		signature : requ.body.signature
	}; 
	data.push(newQuote);
	resp.json(true);*/
});


//6. User
app.get('/user', function (requ, resp) {
  
	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: 'https://sandbox.xfers.io/api/v3/user',
	  method: 'GET',
	  headers: {
		'X-XFERS-USER-API-KEY': requ.get('X-XFERS-USER-API-KEY')
	  }
	};
	
	console.log(req)
  
  var req = https.request(options, function(res) {
  var msg = '';

  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    msg += chunk;
  });
  res.on('end', function() {
    console.log(JSON.parse(msg));
	resp.send(JSON.parse(msg));
  });
  
});

//req.write(data);
req.end();


});


//7. Payment notification
app.post('/payment_notification', function(requ, resp) {

	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/payment_notification',
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  }
	};

	var data = JSON.stringify({
		'txn_id': requ.body.txn_id,
		'order_id': requ.body.order_id,
		'total_amount': requ.body.total_amount,
		'currency': requ.body.currency,
		'status': requ.body.status,
		'meta_data': requ.body.meta_data
	});

	var req = https.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  //res.sendStatus(200);
	  console.log("200 sent!");
	});
	
	console.log("I heard from Xfers about payment cleared!");

	req.write();
	req.end();
	
	//Call Xfers server now to do the verification
	/////////////////////////////////////////////////////////////
	app.post(requ.body.order_id+'/validate', function(req1, res1) {
		console.log("Second stage...");
		
		var options = {
		  host: 'sandbox.xfers.io',
		  port: '443',
		  path: '/api/v3/'+requ.body.order_id+'/validate',
		  method: 'POST',
		  headers: {
			'X-XFERS-USER-API-KEY': requ.get('X-XFERS-USER-API-KEY'),
			'Content-Type': 'application/json'
		  }
		};

		var data1 = JSON.stringify({
			'order_id': requ.body.order_id,
			'total_amount': requ.body.total_amount,
			'currency': requ.body.currency,
			'status': requ.body.status
		});

		var req1 = https.request(options, function(res1) {
			var msg = '';

			res1.setEncoding('utf8');
			res1.on('data', function(chunk) {
				msg += chunk;
			});
			res1.on('end', function() {
				console.log(JSON.parse(msg));
				resp1.send(JSON.parse(msg));
			});
		});

		req1.write(data1);
		req1.end();
		
		
		
		/*var newQuote = {
			phone_no : requ.body.phoneNo,
			signature : requ.body.signature
		}; 
		data.push(newQuote);
		resp.json(true);*/

	////////////////////////////////////////////////////
	});
});


//8. Bank account
app.post('/bank_account', function(requ, resp) {

	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/user/bank_account',
	  method: 'POST',
	  headers: {
		'X-XFERS-USER-API-KEY': requ.get('X-XFERS-USER-API-KEY'),
		'Content-Type': 'application/json'
	  }
	};

	var data = JSON.stringify({
		'account_no': requ.body.account_no,
		'bank': requ.body.bank
	});

	var req = https.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  res.on('data', function(chunk) {
		msg += chunk;
	  });
	  res.on('end', function() {
		console.log(JSON.parse(msg));
		resp.send(JSON.parse(msg));
	  });
	});

	req.write(data);
	req.end();
	
	/*var newQuote = {
		phone_no : requ.body.phoneNo,
		signature : requ.body.signature
	}; 
	data.push(newQuote);
	resp.json(true);*/
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});