package com.google.sps.data;

import java.util.Date;	

public final class Comment{
    private long id;
    private String message;
    private String name;
    private Date date;

    public Comment(long id, String message, String name, Date date){
        this.id = id;
        this.message = message;
        this.name = name;
        this.date = date;
    }

    public Comment(String message, String name, Date date){
        this.message = message;
        this.name = name;
        this.date = date;
    }



    public Comment(String message, String name){
        this(message, name, new Date());
    }

    public String getMessage(){
        return this.message;
    }
    public String getName(){
        return this.name;
    }
    public Date getDate(){
        return this.date;
    }
    public void setMessage(String message){
        this.message = message;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setDate(Date date){
        this.date = date;
    }

}