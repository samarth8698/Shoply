package com.shoply.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoply.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}