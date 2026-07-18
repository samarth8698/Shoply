package com.shoply.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoply.entity.Product;
import com.shoply.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product By Id
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Update Product
    public Product updateProduct(Long id, Product product) {
        Product existing = productRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(product.getName());
            existing.setDescription(product.getDescription());
            existing.setPrice(product.getPrice());
            existing.setImageUrl(product.getImageUrl());
            existing.setQuantity(product.getQuantity());

            return productRepository.save(existing);
        }

        return null;
    }

    // Delete Product
    public String deleteProduct(Long id) {
        productRepository.deleteById(id);
        return "Product Deleted Successfully";
    }
}