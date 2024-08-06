package com.mas.ems.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Configuration
public class MailConfig  {

    @Autowired
    private  JavaMailSender emailSender;

    private final static String subject="employee registration successful";

    public  void sendSimpleMessage(String to, String username,String password) throws MessagingException {
        MimeMessage mimeMessage =emailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,false);
        String text = "The employee has registered successfully on EMS.\n\n" +
                "Username: " + username + "\n" +
                "Password: " + password;
        helper.setFrom("your-email@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);
        emailSender.send(helper.getMimeMessage());
    }


}
