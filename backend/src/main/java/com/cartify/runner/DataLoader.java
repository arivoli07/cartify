package com.cartify.runner;

import com.cartify.entity.Product;
import com.cartify.repository.ProductRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.CommandLineRunner;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadProducts(ProductRepository productRepository) {
        return args -> {

            upsertProduct(productRepository, "iPhone 15", "Apple smartphone", 79999, 10,
                    "Mobiles",
                    "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-geo-230912_inline.jpg.large.jpg");
            upsertProduct(productRepository, "Samsung Galaxy S24", "Samsung flagship phone", 69999, 15,
                    "Mobiles",
                    "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung%20Galaxy%20S24.jpg");
            upsertProduct(productRepository, "Dell Inspiron 14", "Everyday laptop for work and study", 55999, 8,
                    "Laptops",
                    "https://i.dell.com/is/image/DellContent//content/dam/images/products/laptops-and-2-in-1s/inspiron/14-5402-non-touch/in5402nt-cnb-00000ff090-gy.psd?fmt=png-alpha&wid=800");
            upsertProduct(productRepository, "Sony WH-CH520", "Wireless on-ear headphones", 3999, 30,
                    "Accessories",
                    "https://m.media-amazon.com/images/I/41lArSiD5hL._AC_UY218_.jpg");
            upsertProduct(productRepository, "Mi Smart Band 8", "Fitness tracker with AMOLED display", 2499, 25,
                    "Wearables",
                    "https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi%20Mi%20Band%208.jpg");
            upsertProduct(productRepository, "Logitech M331", "Silent wireless mouse", 1299, 40,
                    "Accessories",
                    "https://commons.wikimedia.org/wiki/Special:FilePath/Logitech%20M331%20Silent%20Mouse.jpg");
            upsertProduct(productRepository, "Philips Air Fryer", "Healthy cooking with rapid air tech", 8999, 12,
                    "Kitchen",
                    "https://commons.wikimedia.org/wiki/Special:FilePath/Airfryer.jpg");
            upsertProduct(productRepository, "JBL Go 3", "Portable Bluetooth speaker", 2999, 35,
                    "Accessories",
                    "https://www.henryscameraphoto.com/image/cache/catalog/JBL/GO3/go3black-500x500.png");
            upsertProduct(productRepository, "Havells Mixer Grinder", "Compact mixer grinder for daily use", 3499, 18,
                    "Home Utilities",
                    "https://img.drz.lazcdn.com/static/bd/p/a8105cae9f31f7bbededa6c9c80998bc.jpg_720x720q80.jpg_.webp");
        };
    }

    private void upsertProduct(ProductRepository productRepository,
                               String name,
                               String description,
                               double price,
                               int stock,
                               String category,
                               String imageUrl) {
        Product product = productRepository.findAll()
                .stream()
                .filter(p -> name.equalsIgnoreCase(p.getName()))
                .findFirst()
                .orElseGet(Product::new);

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);
        product.setImageUrl(imageUrl);

        productRepository.save(product);
    }
}
