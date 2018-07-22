var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.post('/',(req,res,next)=>{
	var data=`
	<ul>
		<li> from:  ${req.body.from}</li>
		<li> to: 	${req.body.to}</li>
		<li> sub:   ${req.body.sub}</li>
		<li> text:  ${req.body.text}</li>
		<li> phone: ${req.body.phone}</li>
	</ul>`;
	 nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'tarunsingh233461@gmail.com', 
            pass: 'your passsword' 
        }
    });

let mailOptions = {
        from: 'tarunsingh233461@gmail.com', // sender address
        to: 'receiversemail@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello  ', // plain text body
        html:  data // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
	res.render('index.hbs',{
		send:"mail sended"
	});
});

router.get('/send', function(req, res, next) {
    res.render('index.hbs', { title: 'mailApp' });
});

module.exports = router;
