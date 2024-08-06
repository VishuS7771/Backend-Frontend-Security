package com.mas.ems.util;

import java.security.SecureRandom;

public class PasswordGenerator {

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGIT = "0123456789";
    private static final String SPECIAL = "!@#$%^&*()-_+=<>?";

    private static final String ALL_CHARS = UPPER + LOWER + DIGIT + SPECIAL;
    private static final int PASSWORD_LENGTH = 8;

    public static String generatePassword() {
        if (PASSWORD_LENGTH < 4) throw new IllegalArgumentException("Password length must be at least 4 characters");

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);

        password.append(UPPER.charAt(random.nextInt(UPPER.length())));
        password.append(LOWER.charAt(random.nextInt(LOWER.length())));
        password.append(DIGIT.charAt(random.nextInt(DIGIT.length())));
        password.append(SPECIAL.charAt(random.nextInt(SPECIAL.length())));

        for (int i = 4; i < PASSWORD_LENGTH; i++) {
            password.append(ALL_CHARS.charAt(random.nextInt(ALL_CHARS.length())));
        }
        return shuffleString(password.toString());
    }

    private static String shuffleString(String input) {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(input);
        for (int i = input.length() - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);
            char temp = sb.charAt(index);
            sb.setCharAt(index, sb.charAt(i));
            sb.setCharAt(i, temp);
        }
        return sb.toString();
    }
}
