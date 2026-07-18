package com.shoply.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(
            String email,
            String customerName,
            Long orderId,
            Double amount,
            String address)
    {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");
            

            helper.setTo(email);

            helper.setSubject("🎉 Shoply - Order Confirmation");

            String html = String.format("""
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Shoply</title>

<style>

body{

margin:0;

padding:0;

background:#f3f4f6;

font-family:Arial,sans-serif;

}

.container{

width:650px;

margin:auto;

background:white;

}

.header{

background:#2563eb;

padding:30px;

text-align:center;

color:white;

}

.logo{

font-size:34px;

font-weight:bold;

}

.content{

padding:35px;

}

.success{

background:#dcfce7;

color:#166534;

padding:15px;

border-radius:8px;

text-align:center;

font-weight:bold;

margin-bottom:30px;

}

table{

width:100%%;

border-collapse:collapse;

margin-top:20px;

}

td{

border:1px solid #ddd;

padding:12px;

}

.label{

font-weight:bold;

background:#f8fafc;

width:40%%;

}

.button{

display:inline-block;

padding:14px 28px;

background:#2563eb;

color:white!important;

text-decoration:none;

border-radius:8px;

font-weight:bold;

margin-top:30px;

}

.footer{

margin-top:40px;

background:#f1f5f9;

padding:25px;

text-align:center;

font-size:13px;

color:#555;

}

</style>

</head>

<body>

<div class="container">

<div class="header">


<div class="logo">
🛍 Shoply
</div>

<div style="font-size:18px;font-weight:bold;">
Your Trusted Shopping Partner
</div>

</div>

<div class="content">

<div class="success">

✅ Order Confirmed Successfully

</div>

<h2>

Hello %s,

</h2>

<p>

Thank you for shopping with

<b>Shoply</b>.

</p>

<p>

Your payment has been received successfully.

</p>

<table>

<tr>

<td class="label">

Order ID

</td>

<td>

%d

</td>

</tr>

<tr>

<td class="label">

Amount

</td>

<td>

₹ %.2f

</td>

</tr>
            		
            		<tr>

            		<td class="label">
            		Payment Status
            		</td>

            		<td style="color:green;font-weight:bold;">
            		✅ PAID
            		</td>

            		</tr>

            		<tr>

            		<td class="label">
            		Payment Method
            		</td>

            		<td>
            		Razorpay
            		</td>

            		</tr>

            		<tr>

            		<td class="label">
            		Customer
            		</td>

            		<td>
            		%s
            		</td>

            		</tr>

            		<tr>

            		<td class="label">
            		Delivery Address
            		</td>

            		<td>
            		%s
            		</td>

            		</tr>

            		<tr>

            		<td class="label">
            		Order Status
            		</td>

            		<td>
            		Preparing For Shipment
            		</td>

            		</tr>

            		</table>

            		<div style="text-align:center;">

            		<a
            		href="http://localhost:5173/my-orders"
            		class="button">

            		Track My Order

            		</a>

            		</div>

            		<div style="margin-top:35px;
            		background:#eff6ff;
            		padding:20px;
            		border-radius:10px;">

            		<h3>

            		📦 What's Next?

            		</h3>

            		<ul>

            		<li>Your payment has been confirmed.</li>

            		<li>Your order is under processing.</li>

            		<li>You will receive another email after shipping.</li>

            		<li>Track your order anytime from Shoply.</li>

            		</ul>

            		</div>

            		<div class="footer">

            		<b>Shoply</b>

            		<br><br>

            		Thank you for shopping with us ❤️

            		<br><br>

            		Email :
            		support@shoply.com

            		<br>

            		Website :
            		www.shoply.com

            		<br><br>

            		© 2026 Shoply. All Rights Reserved.

            		</div>

            		</div>

            		</body>

            		</html>

            		""", customerName,
            		orderId,
            		amount,
            		customerName,
            		address
            		);

            		helper.setText(html, true);

            		mailSender.send(message);

            		} catch (Exception e) {

            		e.printStackTrace();

            		}

            		}
    
 // ================= OTP EMAIL =================

    public void sendOtpEmail(String email, String customerName, String otp) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);

            helper.setSubject("🔐 Shoply Password Reset OTP");

            String html = """
                    <html>
                    <body style="font-family:Arial;background:#f5f5f5;padding:30px;">

                        <div style="max-width:600px;margin:auto;background:white;
                        border-radius:10px;padding:30px;">

                            <h2 style="color:#6d28d9;">Shoply Password Reset</h2>

                            <p>Hello <b>%s</b>,</p>

                            <p>Use the OTP below to reset your password.</p>

                            <div style="
                            background:#6d28d9;
                            color:white;
                            font-size:34px;
                            font-weight:bold;
                            text-align:center;
                            padding:20px;
                            border-radius:10px;
                            letter-spacing:6px;">

                            %s

                            </div>

                            <p style="margin-top:20px;">
                            OTP is valid for
                            <b>5 Minutes</b>.
                            </p>

                            <p>
                            If you didn't request this,
                            please ignore this email.
                            </p>

                            <br>

                            <p>
                            Thanks,<br>
                            <b>Shoply Team</b>
                            </p>

                        </div>

                    </body>
                    </html>
                    """.formatted(customerName, otp);

            helper.setText(html, true);

            mailSender.send(message);

        } catch (Exception e) {

            e.printStackTrace();

        }

    }

            		}
