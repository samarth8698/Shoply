package com.shoply.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Bean
    public RazorpayClient razorpayClient() throws Exception {

        System.out.println("====================================");
        System.out.println("RAZORPAY CONFIG LOADED");
        System.out.println("Key ID : " + keyId);

        if (keySecret != null && keySecret.length() >= 6) {
            System.out.println("Key Secret : "
                    + keySecret.substring(0, 6) + "********");
        } else {
            System.out.println("Key Secret : NULL / INVALID");
        }

        System.out.println("====================================");

        return new RazorpayClient(keyId, keySecret);
    }
}