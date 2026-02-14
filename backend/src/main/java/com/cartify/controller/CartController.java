package com.cartify.controller;

import com.cartify.dto.CartItemRequest;
import com.cartify.dto.CartItemResponse;
import com.cartify.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(originPatterns = "http://localhost:*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCart() {
        String email = getCurrentEmail();
        return ResponseEntity.ok(cartService.getCart(email));
    }

    @PostMapping("/items")
    public ResponseEntity<CartItemResponse> addItem(@RequestBody CartItemRequest request) {
        String email = getCurrentEmail();
        return ResponseEntity.ok(cartService.addItem(email, request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartItemResponse> updateQty(@PathVariable Long itemId,
                                                      @RequestParam int quantity) {
        String email = getCurrentEmail();
        CartItemResponse response = cartService.updateQuantity(email, itemId, quantity);
        if (response == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId) {
        String email = getCurrentEmail();
        cartService.removeItem(email, itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        String email = getCurrentEmail();
        cartService.clearCart(email);
        return ResponseEntity.noContent().build();
    }

    private String getCurrentEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new RuntimeException("Unauthorized");
        }
        return auth.getName();
    }
}
