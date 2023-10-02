package com.Sample.demo.controller;

import com.Sample.demo.model.Product;
import com.Sample.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("http://localhost:4200")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(value = "/add",consumes = {"multipart/form-data"})
    public ResponseEntity<Object> addProduct(@RequestPart("product") Product product,@RequestPart("file") MultipartFile file) throws IOException {
        productService.addProduct(product,file);
        return ResponseEntity.ok("Product added successfully");
    }
    @GetMapping("/get")
    public ResponseEntity<List<Product>> getProduct() {
        List<Product> products;
        products = productService.getProduct();
        return ResponseEntity.ok(products);
    }
    @GetMapping("/search/{id}")
    public ResponseEntity<Object> searchProduct(@PathVariable Long id) {
        Product product = productService.searchProduct(id);
        return ResponseEntity.ok(product);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> addProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
    @PutMapping(value ="/update/{id}",consumes = {"multipart/form-data"})
    public ResponseEntity<Object> updateProduct(@PathVariable Long id,@RequestPart("product") Product product,@RequestPart("file") MultipartFile file) throws IOException {
        Product productN = productService.updateProduct(id,product,file);
        return ResponseEntity.ok(productN);
    }
}
