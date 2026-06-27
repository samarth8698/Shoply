package com.shoply.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shoply.entity.Wishlist;
import com.shoply.service.WishlistService;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public List<Wishlist> getAllWishlist() {
        return wishlistService.getAllWishlist();
    }

    @GetMapping("/{id}")
    public Wishlist getWishlistById(@PathVariable Long id) {
        return wishlistService.getWishlistById(id);
    }

    @PostMapping
    public Wishlist saveWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.saveWishlist(wishlist);
    }

    @PutMapping("/{id}")
    public Wishlist updateWishlist(@PathVariable Long id, @RequestBody Wishlist wishlist) {
        return wishlistService.updateWishlist(id, wishlist);
    }

    @DeleteMapping("/{id}")
    public void deleteWishlist(@PathVariable Long id) {
        wishlistService.deleteWishlist(id);
    }
}