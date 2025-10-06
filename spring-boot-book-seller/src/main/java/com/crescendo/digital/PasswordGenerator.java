package com.crescendo.digital;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public static void main(String[] args) {
        // 1. Altere a senha que você deseja criptografar aqui
        String plainPassword = "password123";

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(plainPassword);

        // 2. O resultado será impresso no console.
        // Copie a senha criptografada abaixo e cole no seu banco de dados.
        System.out.println("Senha em texto plano: " + plainPassword);
        System.out.println("Senha criptografada (BCrypt): " + hashedPassword);
    }
}
