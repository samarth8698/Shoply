package com.shoply.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.razorpay.Order;
import com.shoply.dto.PaymentVerificationRequest;
import com.shoply.entity.Payment;
import com.shoply.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // ==========================
    // Create Razorpay Order
    // ==========================
    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Payment payment) {

        try {

            System.out.println("========== CREATE ORDER ==========");
            System.out.println("Amount : " + payment.getAmount());

            Order order = paymentService.createRazorpayOrder(payment.getAmount());

            System.out.println("Order Created Successfully");
            System.out.println("Order ID : " + order.get("id"));

            Map<String, Object> response = new HashMap<>();

            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("status", order.get("status"));

            return response;

        } catch (Exception e) {

            System.out.println("========== RAZORPAY ERROR ==========");
            e.printStackTrace();

            throw new RuntimeException(
                    "Unable to create Razorpay Order : " + e.getMessage());

        }
    }

    // ==========================
    // Verify Payment Signature
    // ==========================
    @PostMapping("/verify")
    public boolean verifyPayment(
            @RequestBody PaymentVerificationRequest request) {

        return paymentService.verifyPayment(request);

    }

    // ==========================
    // Save Payment
    // ==========================
    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    // ==========================
    // Get All Payments
    // ==========================
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // ==========================
    // Get Payment By Id
    // ==========================
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    // ==========================
    // Update Payment
    // ==========================
    @PutMapping("/{id}")
    public Payment updatePayment(
            @PathVariable Long id,
            @RequestBody Payment payment) {

        return paymentService.updatePayment(id, payment);
    }

    // ==========================
    // Delete Payment
    // ==========================
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {

        paymentService.deletePayment(id);

        return "Payment Deleted Successfully";
    }
}