package com.shoply.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class RazorpaySignatureUtil {

    private RazorpaySignatureUtil() {
    }

    public static boolean verifySignature(
            String orderId,
            String paymentId,
            String signature,
            String secret) {

        try {

            String payload = orderId + "|" + paymentId;

            Mac sha256 = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKey =
                    new SecretKeySpec(secret.getBytes(), "HmacSHA256");

            sha256.init(secretKey);

            byte[] hash = sha256.doFinal(payload.getBytes());

            StringBuilder hex = new StringBuilder();

            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }

            return hex.toString().equals(signature);

        } catch (Exception e) {
            return false;
        }
    }
}