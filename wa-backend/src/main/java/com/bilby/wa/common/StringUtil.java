package com.bilby.wa.common;

public class StringUtil {
    private StringUtil() {
        throw new UnsupportedOperationException("u can't instantiate me...");
    }

    /* whether it is an empty string or null */
    public static boolean isEmpty(final CharSequence s) {
        return s == null || s.length() == 0;
    }

    /* whether it is an empty string or null or spaces */
    public static boolean isTrimEmpty(final String s) {
        return (s == null || s.trim().length() == 0);
    }

    /* whether it is an empty string or null or empty characters  */
    public static boolean isSpace(final String s) {
        if (s == null) return true;
        for (int i = 0, len = s.length(); i < len; ++i) {
            if (!Character.isWhitespace(s.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
