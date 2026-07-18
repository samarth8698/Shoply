package com.shoply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shoply.entity.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
}