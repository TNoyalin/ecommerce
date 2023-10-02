package com.Sample.demo.service;

import com.Sample.demo.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public interface ProductService {
    void addProduct(Product product,MultipartFile file) throws IOException;
    List<Product> getProduct();
    Product searchProduct(Long id);
    void deleteProduct(Long id);
    Product updateProduct(Long id,Product product,MultipartFile file)  throws IOException;
}
