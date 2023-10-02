package com.Sample.demo.serviceImpl;

import com.Sample.demo.model.Product;
import com.Sample.demo.repository.ProductRepo;
import com.Sample.demo.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Override
    public void addProduct(Product product,MultipartFile file) throws IOException {
        String encodedString = Base64.getEncoder().encodeToString(file.getBytes());
        product.getImagePath(encodedString);
        product.setImageByte(file.getBytes());
        productRepo.save(product);
    }
    @Override
    public List<Product> getProduct() {
        return productRepo.findAll();
    }
    @Override
    public Product searchProduct(Long id) {
        return productRepo.findById(id).orElse(null);
    }
    @Override
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }
    @Override
    public Product updateProduct(Long id,Product product,MultipartFile file) throws IOException {
        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setDirections(product.getDirections());
        existingProduct.setInStock(product.getInStock());
        existingProduct.setPrice(product.getPrice());
        byte[] fileBytes = file.getBytes();
        existingProduct.setImageByte(fileBytes);
        return productRepo.save(existingProduct);
    }
}
