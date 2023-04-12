package com.com2202.assigment.util;

import java.util.UUID;

public class UidGenerator {
    public static String generateUid() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
