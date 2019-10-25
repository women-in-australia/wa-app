package com.bilby.wa.service;

import com.bilby.wa.common.Constant;
import com.bilby.wa.exception.UploadException;
import com.bilby.wa.pojo.ResponseInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
public class UploadService {
    /**
     * save the file that user uploaded to server
     * @param file file from user
     * @return file location
     * @throws UploadException error uploading
     */
    private String saveUploadedFile(MultipartFile file) throws UploadException {
        try {
            if (file.isEmpty()) {
                return "-1";
            }
            long size = file.getSize();
            /* max size: 40MB */
            long maxSize = 40960 * 1024;
            if (size > maxSize) {
                return "-2";
            }
            byte[] bytes = file.getBytes();

            File upload = new File(Constant.FILE_PATH);
            if (!upload.exists()) {
                upload.mkdirs();
            }
            String suffix = "." + Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf(".") + 1);
            String res = UUID.randomUUID() + suffix;
            Path path = Paths.get(Constant.FILE_PATH + res);
            Files.write(path, bytes);
            return Constant.FILE_URL + res;
        } catch (Exception e) {
            throw new UploadException("Unknow Eror");
        }
    }

    /**
     * Deal with user uploading
     * @param uploadFile file from user
     * @param index index of the file
     * @return response data
     * @throws UploadException error uploading
     */
    public ResponseInfo uploadFile(MultipartFile uploadFile, Integer index) throws UploadException {
        String res = saveUploadedFile(uploadFile);
        if (res.equals("-1")) {
            throw new UploadException("File is empty");
        } else if (res.equals("-2")) {
            throw new UploadException("File is too large");
        } else {
            Map<String, String> data = new HashMap<>();
            data.put("url", res);
            data.put("index", String.valueOf(index));
            return ResponseInfo.buildSuccess(data);
        }
    }
}
