package com.shoply.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoply.entity.Order;
import com.shoply.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    // Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Save Order + Send Email
    public Order saveOrder(Order order) {

        System.out.println("==================================");
        System.out.println("SAVE ORDER START");
        System.out.println("==================================");

        Order savedOrder = orderRepository.save(order);

        System.out.println("Order Saved Successfully");
        System.out.println("Order ID : " + savedOrder.getId());
        System.out.println("Customer : " + savedOrder.getCustomerName());
        System.out.println("Email : " + savedOrder.getEmail());

        try {

            System.out.println("Sending Email...");

            emailService.sendOrderConfirmation(
                    savedOrder.getEmail(),
                    savedOrder.getCustomerName(),
                    savedOrder.getId(),
                    savedOrder.getAmount(),
                    savedOrder.getAddress()
            );

            System.out.println("==================================");
            System.out.println("EMAIL SENT SUCCESSFULLY");
            System.out.println("==================================");

        } catch (Exception e) {

            System.out.println("==================================");
            System.out.println("EMAIL SENDING FAILED");
            System.out.println("==================================");

            e.printStackTrace();
        }

        return savedOrder;
    }

    // Get Order By Id
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    // Delete Order
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    // Update Order
    public Order updateOrder(Long id, Order order) {
        order.setId(id);
        return orderRepository.save(order);
    }
}