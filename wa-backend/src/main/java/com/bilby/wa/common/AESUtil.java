package com.bilby.wa.common;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Locale;

/**
 * @author Yangzhe Xie
 * @date 9/9/19
 * @description Encryption utility
 */
public class AESUtil {

    private static final String key = "di47anHaihFS98G87F8NG12570hGnGU1";

    private static final String iv = "bds84hAhFKU7ga9s";

    public static String encrypt(String encryptStr) {
        try {
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ivParameterSpec);

            byte[] encrypted = cipher.doFinal(encryptStr.getBytes());

            return byte2HexStr(encrypted);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    public static String decrypt(String encryptedStr) {
        try {
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");


            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, ivParameterSpec);

            byte[] bytes = hexStr2Bytes(encryptedStr);
            byte[] original = cipher.doFinal(bytes);

            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    private static byte[] hexStr2Bytes(String hexStr) {
        hexStr = hexStr.trim().replace(" ", "").toUpperCase(Locale.US);
        int m = 0, n = 0;
        int iLen = hexStr.length() / 2;
        byte[] ret = new byte[iLen];

        for (int i = 0; i < iLen; i++) {
            m = i * 2 + 1;
            n = m + 1;
            ret[i] = (byte) (Integer.decode("0x" + hexStr.substring(i * 2, m) + hexStr.substring(m, n)) & 0xFF);
        }
        return ret;
    }

    private static String byte2HexStr(byte[] bytes) {
        StringBuilder hs = new StringBuilder();
        String stmp = "";
        for (byte aByte : bytes) {
            stmp = (Integer.toHexString(aByte & 0XFF));
            if (stmp.length() == 1)
                hs.append("0").append(stmp);
            else
                hs.append(stmp);
        }
        return hs.toString();
    }

}
