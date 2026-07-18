package com.shoply.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoply.entity.Wishlist;
import com.shoply.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public List<Wishlist> getAllWishlist() {
        return wishlistRepository.findAll();
    }

    public Wishlist saveWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public Wishlist getWishlistById(Long id) {
        return wishlistRepository.findById(id).orElse(null);
    }

    public Wishlist updateWishlist(Long id, Wishlist wishlist) {
        wishlist.setId(id);
        return wishlistRepository.save(wishlist);
    }

    public void deleteWishlist(Long id) {
        wishlistRepository.deleteById(id);
    }
}