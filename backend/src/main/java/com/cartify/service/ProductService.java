package com.cartify.service;

import com.cartify.entity.Product;
import com.cartify.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ THIS METHOD WAS MISSING
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
