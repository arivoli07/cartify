package com.cartify.service;

import com.cartify.dto.CartItemRequest;
import com.cartify.dto.CartItemResponse;
import com.cartify.entity.CartItem;
import com.cartify.entity.Product;
import com.cartify.entity.User;
import com.cartify.repository.CartItemRepository;
import com.cartify.repository.ProductRepository;
import com.cartify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(CartItemRepository cartItemRepository,
                       UserRepository userRepository,
                       ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<CartItemResponse> getCart(String email) {
        User user = getUser(email);
        return cartItemRepository.findByUser(user)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CartItemResponse addItem(String email, CartItemRequest request) {
        User user = getUser(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existing = cartItemRepository.findByUserAndProduct(user, product);
        CartItem item = existing.orElseGet(CartItem::new);
        item.setUser(user);
        item.setProduct(product);
        int qty = Math.max(1, request.getQuantity());
        item.setQuantity(existing.map(i -> i.getQuantity() + qty).orElse(qty));

        return toResponse(cartItemRepository.save(item));
    }

    public CartItemResponse updateQuantity(String email, Long itemId, int quantity) {
        User user = getUser(email);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        if (quantity <= 0) {
            cartItemRepository.delete(item);
            return null;
        }
        item.setQuantity(quantity);
        return toResponse(cartItemRepository.save(item));
    }

    public void removeItem(String email, Long itemId) {
        User user = getUser(email);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        cartItemRepository.delete(item);
    }

    public void clearCart(String email) {
        User user = getUser(email);
        cartItemRepository.deleteByUser(user);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private CartItemResponse toResponse(CartItem item) {
        return new CartItemResponse(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getPrice(),
                item.getProduct().getImageUrl(),
                item.getQuantity()
        );
    }
}
