package com.cartify.dto;

public class CartItemResponse {

    private Long id;
    private Long productId;
    private String name;
    private double price;
    private String imageUrl;
    private int quantity;

    public CartItemResponse(Long id, Long productId, String name, double price, String imageUrl, int quantity) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }
}
