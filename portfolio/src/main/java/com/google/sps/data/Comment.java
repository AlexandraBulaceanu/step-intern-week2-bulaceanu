package com.google.sps.data;

import java.time.ZonedDateTime;

public final class Comment{
    private final long id;
    private String message;
    private String name;
    private ZonedDateTime date;

    public Comment(long id, String message, String name, ZonedDateTime date){
        this.id = id;
        this.message = message;
        this.name = name;
        this.date = date;
    }

    public Comment(String message, String name, ZonedDateTime date){
        this.message = message;
        this.name = name;
        this.date = date;
    }



    public Comment(String message, String name){
        this(message, name, ZonedDateTime.now());
    }

    public String getMessage(){
        return this.message;
    }
    public String getName(){
        return this.name;
    }
    public String getDate(){
        return this.date;
    }
    public void setMessage(String message){
        this.message = message;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setDate(String date){
        this.date = date;
    }

}