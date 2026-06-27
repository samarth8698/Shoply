package com.shoply.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoply.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}