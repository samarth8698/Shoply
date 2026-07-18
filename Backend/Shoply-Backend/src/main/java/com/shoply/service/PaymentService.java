package com.shoply.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.shoply.dto.PaymentVerificationRequest;
import com.shoply.entity.Payment;
import com.shoply.repository.PaymentRepository;
import com.shoply.util.RazorpaySignatureUtil;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RazorpayClient razorpayClient;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    // ==========================
    // Save Payment
    // ==========================
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // ==========================
    // Get All Payments
    // ==========================
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // ==========================
    // Get Payment By Id
    // ==========================
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    // ==========================
    // Update Payment
    // ==========================
    public Payment updatePayment(Long id, Payment payment) {
        payment.setId(id);
        return paymentRepository.save(payment);
    }

    // ==========================
    // Delete Payment
    // ==========================
    public String deletePayment(Long id) {
        paymentRepository.deleteById(id);
        return "Payment Deleted Successfully";
    }

    // ==========================
    // Create Razorpay Order
    // ==========================
    public Order createRazorpayOrder(Double amount) throws RazorpayException {

        JSONObject orderRequest = new JSONObject();

        orderRequest.put("amount", (int) (amount * 100));
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "shoply_" + System.currentTimeMillis());

        return razorpayClient.orders.create(orderRequest);
    }

    // ==========================
    // Verify Razorpay Signature
    // ==========================
    public boolean verifyPayment(PaymentVerificationRequest request) {

        System.out.println("========== VERIFY PAYMENT ==========");
        System.out.println("Order ID    : " + request.getRazorpayOrderId());
        System.out.println("Payment ID  : " + request.getRazorpayPaymentId());
        System.out.println("Signature   : " + request.getRazorpaySignature());

        boolean verified = RazorpaySignatureUtil.verifySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature(),
                razorpaySecret);

        System.out.println("Verified    : " + verified);

        return verified;
    }
}