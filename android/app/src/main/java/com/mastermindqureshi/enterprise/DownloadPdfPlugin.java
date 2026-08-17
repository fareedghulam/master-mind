package com.mastermindqureshi.enterprise;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;

import androidx.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;

import java.io.OutputStream;
import java.util.Base64;

@CapacitorPlugin(name = "DownloadPdf")
public class DownloadPdfPlugin extends Plugin {

    @PluginMethod
    public void save(PluginCall call) {
        String filename = call.getString("filename");
        String data = call.getString("data");

        if (filename == null || filename.trim().isEmpty()) {
            call.reject("PDF filename is required.");
            return;
        }

        if (data == null || data.trim().isEmpty()) {
            call.reject("PDF data is required.");
            return;
        }

        try {
            byte[] pdfBytes;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                pdfBytes = Base64.getDecoder().decode(data);
            } else {
                pdfBytes = android.util.Base64.decode(data, android.util.Base64.DEFAULT);
            }

            ContentResolver resolver = getContext().getContentResolver();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentValues values = new ContentValues();
                values.put(MediaStore.Downloads.DISPLAY_NAME, filename);
                values.put(MediaStore.Downloads.MIME_TYPE, "application/pdf");
                values.put(
                    MediaStore.Downloads.RELATIVE_PATH,
                    Environment.DIRECTORY_DOWNLOADS
                );
                values.put(MediaStore.Downloads.IS_PENDING, 1);

                Uri uri = resolver.insert(
                    MediaStore.Downloads.EXTERNAL_CONTENT_URI,
                    values
                );

                if (uri == null) {
                    call.reject("Android could not create the PDF in Downloads.");
                    return;
                }

                try {
                    OutputStream outputStream = resolver.openOutputStream(uri);

                    if (outputStream == null) {
                        resolver.delete(uri, null, null);
                        call.reject("Could not open the Downloads file.");
                        return;
                    }

                    try {
                        outputStream.write(pdfBytes);
                        outputStream.flush();
                    } finally {
                        outputStream.close();
                    }

                    ContentValues completed = new ContentValues();
                    completed.put(MediaStore.Downloads.IS_PENDING, 0);
                    resolver.update(uri, completed, null, null);

                    JSObject result = new JSObject();
                    result.put("success", true);
                    result.put("filename", filename);
                    result.put("location", "Download");
                    call.resolve(result);

                } catch (Exception writeError) {
                    resolver.delete(uri, null, null);
                    throw writeError;
                }

            } else {
                // Android 9 and older fallback.
                java.io.File downloadsDir = Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_DOWNLOADS
                );

                if (!downloadsDir.exists() && !downloadsDir.mkdirs()) {
                    call.reject("Could not create the Downloads directory.");
                    return;
                }

                java.io.File outputFile = new java.io.File(downloadsDir, filename);

                java.io.FileOutputStream outputStream =
                    new java.io.FileOutputStream(outputFile);

                try {
                    outputStream.write(pdfBytes);
                    outputStream.flush();
                } finally {
                    outputStream.close();
                }

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("filename", filename);
                result.put("location", "Download");
                call.resolve(result);
            }

        } catch (Exception e) {
            call.reject(
                "PDF کو Download فولڈر میں محفوظ نہیں کیا جا سکا: " +
                (e.getMessage() != null ? e.getMessage() : "Unknown error"),
                e
            );
        }
    }
}
